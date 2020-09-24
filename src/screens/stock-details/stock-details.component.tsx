import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text,
  View,
  Form,
  Item,
  Label,
  Input,
  List,
  ListItem,
  Switch,
} from "native-base";
import { Formik, useFormikContext } from "formik";
import { TouchableHighlight } from "react-native";
import StockDetails from "../../components/intraday-stocks/stock-details/stock-details.component";
import { AppContext } from "../../providers/app.provider";
import { placeOrder } from "../../services/stock.service";

const StockDetailsHome = ({ navigation }: any) => {
  const {
    selectedStock,
    setSelectedStock,
    config,
    setSavedTrade,
    savedTrade,
  } = useContext(AppContext);

  const [segment, setSegment] = useState("CHART");

  const [result, setResult] = useState<any>({
    quantity: 0,
    buyCost: 0,
    slCost: 0,
    targetCost: 0,
    expectedProfit: 0,
    maximumLoss: 0,
  });

  const [formValues, setFormValues] = useState({
    buyPrice: selectedStock.currentPrice,
    stoploss: selectedStock.currentPrice,
    target: selectedStock.currentPrice,
  });

  const [freezeQty, setFreezeQty] = useState(false);
  const [orderInfo, setOrderInfo] = useState({status:"PENDING"});
  const calculateQuantity = ({
    quantity,
    buyPrice,
    stoploss,
    target,
    freezeQty1,
  }: any) => {
    if (!freezeQty1) {
      const gap = Math.abs(buyPrice - stoploss);
      const maximumLossAmount = config.intradayRiskAmount;
      if (gap) {
        quantity = Math.round(maximumLossAmount / gap);
      }
    }

    const buyCost = buyPrice * quantity;
    const slCost = stoploss * quantity;
    const targetCost = target * quantity;

    let trend = "up";
    if (buyPrice > target) {
      trend = "down";
    }
    let expectedProfit = targetCost - buyCost;
    let maximumLoss = buyCost - slCost;

    if (trend === "down") {
      expectedProfit = buyCost - targetCost;
      maximumLoss = slCost - buyCost;
    }

    setResult({
      quantity,
      buyCost,
      slCost,
      targetCost,
      expectedProfit,
      maximumLoss,
    });
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { quantity } = result;
    calculateQuantity({ quantity, ...formValues, freezeQty1: freezeQty });
  }, [formValues]);

  useEffect(() => {
    const tradeSaved =
      savedTrade &&
      savedTrade.find((x: any) => x.symbol === selectedStock.symbol);

    let freeze = false;
    if (tradeSaved) {
      const { symbol, freezeQty, orderInfo, ...result } = tradeSaved;
      freeze = freezeQty;
      setFreezeQty(freezeQty);
      setOrderInfo(orderInfo)
      setFormValues(() => ({
        buyPrice: result.buyPrice,
        stoploss: result.stoploss,
        target: result.target,
      }));

      setResult({ quantity: result.quantity });
    } else {
      if (selectedStock.tradeInfo) {
        const { orderPrice, sl1, target } = selectedStock.tradeInfo;

        setFormValues(() => ({
          buyPrice: orderPrice,
          stoploss: sl1,
          target: target,
        }));
      }
    }

    // calculateQuantity({ ...formValues, quantity: result.quantity,freezeQty1:freeze});
  }, []);

  const sync = (values: any, freezeQty: boolean,orderInfo?:any) => {
    const saved =
      savedTrade &&
      savedTrade.filter((x: any) => x.symbol !== selectedStock.symbol);

      const newObject = {
        ...values,
        freezeQty,
        quantity: result.quantity,
        symbol: selectedStock.symbol,
        orderInfo
      };

      const newSavedTrade = [newObject, ...saved];
      setSavedTrade(newSavedTrade);

  
      
    
   
  };
  return (
    <Container>
      <Header hasSegment>
        <Left>
          <Button
            transparent
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Segment>
            <Button
              active={segment === "CHART"}
              first
              onPress={() => setSegment("CHART")}
            >
              <Text>Charts</Text>
            </Button>
            <Button
              active={segment === "CALC"}
              last
              onPress={() => setSegment("CALC")}
            >
              <Text>Calc</Text>
            </Button>
          </Segment>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
        </Right>
      </Header>
      <Content>
        {segment === "CHART" && (
          <View>
           
            {selectedStock !== null && (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0e0e0e",
                    fontSize: 20,
                  }}
                >
                  {selectedStock.symbol}
                </Text>
                <StockDetails stock={selectedStock} />
              </>
            )}
          </View>
        )}

        {segment === "CALC" && (
          <View>
            
            <Content style={{ padding: 20 }}>
              <Formik
                initialValues={formValues}
                validate={(values: any) => {
                  const errors: any = {};
                  if (!values.buyPrice) {
                    errors.buyPrice = "Required";
                  }
                  if (!values.stoploss) {
                    errors.stoploss = "Required";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setFormValues(() => values);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setValues,
                  /* and other goodies */
                }) => {
                  const layout = {
                    labelCol: { span: 8 },
                    wrapperCol: { span: 16 },
                  };

                  const onChange = (name: string) => (e: any) => {
                    setFormValues({
                      ...formValues,
                      [name]: e,
                    });

                    sync({ ...formValues, [name]: e }, freezeQty,orderInfo);

                    return handleChange(name)(e);
                  };
                  return (
                    <>
                      <Form>
                        <Item floatingLabel last>
                          <Label>Buy Price</Label>
                          <Input
                            keyboardType="numeric"
                            onChangeText={onChange("buyPrice")}
                            onBlur={handleBlur("buyPrice")}
                            value={values.buyPrice.toString()}
                          />
                          {errors.buyPrice &&
                            touched.buyPrice &&
                            errors.buyPrice}
                        </Item>
                        <Item floatingLabel last>
                          <Label>Stoploss</Label>
                          <Input
                            keyboardType="numeric"
                            onChangeText={onChange("stoploss")}
                            onBlur={handleBlur("stoploss")}
                            value={values.stoploss.toString()}
                          />
                          {errors.stoploss &&
                            touched.stoploss &&
                            errors.stoploss}
                        </Item>

                        <Item floatingLabel last>
                          <Label>Target</Label>

                          <Input
                            keyboardType="numeric"
                            onChangeText={onChange("target")}
                            onBlur={handleBlur("target")}
                            value={values.target.toString()}
                          />
                          {errors.target && touched.target && errors.target}
                        </Item>
                      </Form>

                      <List>
                        <ListItem>
                          <Text>Quantity:{result.quantity}</Text>
                        </ListItem>
                        <ListItem>
                          <Left>
                            <Text>Freeze Quantity</Text>
                          </Left>
                          <Body>
                            <Switch
                              value={freezeQty}
                              onValueChange={() => {
                                setFreezeQty(() => !freezeQty);
                                calculateQuantity({
                                  ...formValues,
                                  quantity: result.quantity,
                                  freezeQty1: !freezeQty,
                                });

                                sync(values, !freezeQty,orderInfo);
                              }}
                            />
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Text>Amount:₹{result.buyCost.toFixed(2)}</Text>
                        </ListItem>

                        <ListItem>
                          <Text>
                            Expected Profit ₹{result.expectedProfit.toFixed(2)}
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>
                            Maximum Loss ₹{result.maximumLoss.toFixed(2)}
                          </Text>
                        </ListItem>
                      </List>
                      <Button
                        style={{ alignSelf: "center", marginTop: 20 }}
                        onPress={() => {
                          setFormValues({
                            buyPrice: selectedStock.currentPrice,
                            stoploss: selectedStock.currentPrice,
                            target: selectedStock.currentPrice,
                          });
                          setResult({
                            quantity: 0,
                            buyCost: 0,
                            slCost: 0,
                            targetCost: 0,
                            expectedProfit: 0,
                            maximumLoss: 0,
                          });
                          setFreezeQty(false);
                          setValues({
                            buyPrice: selectedStock.currentPrice,
                            stoploss: selectedStock.currentPrice,
                            target: selectedStock.currentPrice,
                          });
                        }}
                      >
                        <Text>Reset</Text>
                      </Button>
                      {orderInfo.status === "PENDING" && (
                        <Button
                          disabled={ !(!loading && freezeQty)}
                          style={{ alignSelf: "center", marginTop: 20 }}
                          onPress={async () => {
                            setLoading(true);
                            const dto = {
                              symbol: selectedStock.symbol,
                              transaction_type:
                                selectedStock.trend === "UP" ? "BUY" : "SELL",
                              price: +values.buyPrice,
                              quantity: +result.quantity,
                              sl: +values.stoploss,
                              target: +values.target,
                            }
                            console.log('dto',dto)
                            const res = await placeOrder(dto).catch((x) => {
                              alert("Error in placing order.");
                              setLoading(false);
                            });
                            if (res && res.data && res.data.symbol) {
                              alert("Order Placed.");
                              const orderInfo = {status:"PLACED"};
                              setOrderInfo(orderInfo)
                              sync(values, freezeQty,orderInfo);
                            }
                            setLoading(false);
                          }}
                        >
                          <Text>Place Order</Text>
                        </Button>
                      )}

                      {/* {result && (
                        <Descriptions
                          title={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <span>Quantity:{result.quantity}</span>

                              <Switch
                                // style={{marginLeft:10}}
                                checked={freezeQty}
                                checkedChildren="Freezed"
                                unCheckedChildren="&nbsp;&nbsp;Unfreezed"
                                onChange={() => {
                                  setFreezeQty(() => !freezeQty);
                                  calculateQuantity();
                                }}
                              />

                              <Button
                                size="small"
                                onClick={() => {
                                  setFormValues({
                                    buyPrice: stockDetails.currentPrice,
                                    stoploss: stockDetails.currentPrice,
                                    target: stockDetails.currentPrice,
                                  });
                                  setResult({
                                    quantity: 0,
                                    buyCost: 0,
                                    slCost: 0,
                                    targetCost: 0,
                                    expectedProfit: 0,
                                    maximumLoss: 0,
                                  });
                                  setFreezeQty(false);
                                  setValues({
                                    buyPrice: stockDetails.currentPrice,
                                    stoploss: stockDetails.currentPrice,
                                    target: stockDetails.currentPrice,
                                  });
                                }}
                              >
                                Reset
                              </Button>
                            </div>
                          }
                          column={1}
                          bordered
                        >
                          <Descriptions.Item label="Amount">
                            ₹{result.buyCost.toFixed(2)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Expected Profit">
                            ₹{result.expectedProfit.toFixed(2)}
                          </Descriptions.Item>
                          <Descriptions.Item label="Maximum Loss">
                            ₹{result.maximumLoss.toFixed(2)}
                          </Descriptions.Item>
                        </Descriptions>
                      )} */}
                    </>
                  );
                }}
              </Formik>
            </Content>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default StockDetailsHome;
