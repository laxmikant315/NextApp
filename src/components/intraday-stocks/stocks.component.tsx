import React, { useEffect, useState, useContext } from "react";
import { getNotifications } from "../../services/stock.service";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  View,
  Button,
  Left,
  Right,
  Icon,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import {
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { AppContext } from "../../providers/app.provider";
import { useNavigation } from "@react-navigation/native";
const Stocks = ({ stocks,fetchData }: any) => {
  const navigation = useNavigation();
  const { setSelectedStock } = useContext(AppContext);
  const [refreshing, setRefreshing] = useState(false);


  return (
    <Container>
      <Content
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData();
            setRefreshing(false);
          }}
        />
      }
      >
        <List>
          {stocks &&
            stocks.map((stock: any, index: number) => (
              <ListItem key={index}>
                {stock && 
                <>
                <Left>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedStock(stock);

                      navigation.navigate("Stock");
                    }}
                  >
                    <Text>
                      {stock.goodOne && stock.valid && (
                        //   <LikeTwoTone style={{ color: "#5fe48a" }} />
                        // )

                        <Ionicons name="md-thumbs-up" size={24} />
                      )}{" "}
                      <Text
                        style={{
                          color: stock.trend === "DOWN" ? "red" : "green",
                          fontSize: 20,
                        }}
                      >
                        {stock.symbol}
                      </Text>
                      {stock.currentPrice}
                      {"\n"}
                      <Text style={{ fontSize: 12 }}>
                        on {moment(stock.createDt).format("DD MMM YYYY h:mm a")}
                      </Text>{" "}
                      {"\n"}
                      {!stock.valid && stock.invalidReason && (
                        <>
                          <Text style={{ color: "red" }}>
                            {stock.invalidReason} 
                          </Text>
                        </>
                      )}
                    </Text>
                  </TouchableOpacity>
                </Left>
                <Right>
                  {((stock.lastCandelIsGreen && stock.trend === "UP") ||
                    (!stock.lastCandelIsGreen && stock.trend === "DOWN")) && (
                    <Feather name="sliders" size={24} color="black" />
                  )}
                </Right>
                </>
                
                }
                
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  );
};

export default Stocks;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
