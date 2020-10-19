import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Fab,
  Icon,
  Button,
  View,
  Card,
  CardItem, Spinner
} from "native-base";
import { getSlots, getSwingExecuteOut, getTransactions } from "../../services/stock.service";
import moment from "moment";
export default ({ route, navigation }: any) => {
  const [trasactions, setTransactions]: any = useState([]);
  const [loading, setLoading] = useState(false);
  let unsubscribe: any;
  const fetchData = () => { 
    setLoading(true);

    getTransactions().then(x => {

      setTransactions(x);
    }).finally(()=>{
      setLoading(false);
    })
  }
  useEffect(() => {

    unsubscribe = navigation.addListener(
      'focus',
      () => {
        fetchData();
      }
    );

    return unsubscribe;

  }, [navigation])



  return (
    <Container>
      <View style={{ flex: 1 }}>
      {loading &&  
      <Spinner  color='blue'  />}
        <Content>

          <List >
            {trasactions && trasactions.length>0 && trasactions
              .sort((x: any, y: any) => new Date(y.date).getTime() > new Date(x.date).getTime() ? 1 : -1)
              .map((x: any) => <ListItem avatar key={x.symbol + x.type + x.qty + x.orderPrice + x.createdOn}>

                <Left>{/* <Thumbnail source={{ uri: "Image URL" }} /> */}</Left>
                <Body>
                  <Text style={{ color: x.type === "IN" ? "green" : "red" }}>{x.symbol}</Text>
                  <Text note>
                    Type:{x.type}
                  </Text>
                  <Text note>
                    Order Price:{x.orderPrice}
                  </Text>
                  {x.investedAmount && <Text note>
                    Invested Amount: {x.investedAmount.toFixed(2)}
                  </Text>}

                  <Text note>
                    Balanced Amount: {x.balancedAmount.toFixed(2)}
                  </Text>

                </Body>
                <Right>

                  <Text note>{moment(x.createdOn).format("DD/MM/YYYY hh:mm a")}</Text>
                  <Text note>
                    Quantity:{x.qty}
                  </Text>


                </Right>

              </ListItem>)}


          </List>

        </Content>

      </View>
    </Container>
  );
};
