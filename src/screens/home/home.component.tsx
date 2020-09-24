import React, { useContext, useEffect } from "react";

import { Container, Tabs, Tab, View, Button } from "native-base";
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


  return (
     
    <Container>
        
      <Tabs >
     
        <Tab heading="Intraday">
          <IntradayStocks/>
        </Tab>
        <Tab heading="Swing">
            <SwingStocks/>
     
        </Tab>
        <Tab heading="IntraLogs">
            <IntradayLogs/>
     
        </Tab>
         <Tab heading="Slots">
          <SwingSlots/>
        </Tab>
       
      </Tabs>
    </Container>
   
  );
};

export default Home;
