import React, { useContext, useEffect } from "react";

import { Container, Tabs, Tab, View, Button,Text } from "native-base";
import IntradayStocks from "../../components/intraday-stocks/intraday-stocks.component";

import {  pushOnApp, getNotifications } from "../../services/stock.service";
import { AppContext } from "../../providers/app.provider";
import Stocks from "../../components/intraday-stocks/stocks.component";
import SwingStocks from "../../components/intraday-stocks/swing-stocks.component";
import SwingSlots from "../swing-slots/swing-slots.component";
import IntradayLogs from "../../components/intraday-stocks/intraday-log.component";

const Home = ({ navigation }: any) => {
  const sendPushNotification = () => {
    pushOnApp().then((x) => {
      console.log(x);
    });
  };

  const buttonStyle= {
    margin:10
  }

  return (
     
    <Container>
       <View style={{ height:'100%'}}>
       <View style={{ flexDirection: "row",  justifyContent: 'center'  }}>
       <Button  style={buttonStyle} onPress={()=>{navigation.navigate('Swing')}}><Text>Swing</Text></Button> 
       <Button style={buttonStyle} onPress={()=>{navigation.navigate('Logs')}}><Text>Intraday Logs</Text></Button> 
       <Button style={buttonStyle} onPress={()=>{navigation.navigate('Slots')}}><Text>Slots</Text></Button> 
       </View>
       <View  style={{ flexDirection: "row",flexGrow:1 , justifyContent: 'center' }}>
        <IntradayStocks />
        </View>
       </View>
        
    </Container>
   
  );
};

export default Home;
