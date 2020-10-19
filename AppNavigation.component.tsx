
import React ,{useEffect, useContext, useState}from 'react';
import { getConfig } from './src/services/stock.service';
import { AppContext } from './src/providers/app.provider';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './src/screens/home/home.component';

import StockDetails from "./src/screens/stock-details/stock-details.component";
import IntradayStocks from './src/components/intraday-stocks/intraday-stocks.component';
import SwingStocks from './src/components/intraday-stocks/swing-stocks.component';
import IntradayLogs from './src/components/intraday-stocks/intraday-log.component';
import SwingSlots from './src/screens/swing-slots/swing-slots.component';
import NewSlot from './src/screens/swing-slots/new-slot.component';
import Transactions from './src/screens/swing-slots/transactions.component';


const Stack = createStackNavigator();
const AppNavigation = ()=>{



    const {setConfig} = useContext(AppContext)
    useEffect(()=>{
        getConfig().then(config=>{
          setConfig(config)
        })
      },[])


     return <NavigationContainer>
            <Stack.Navigator  initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Stock" component={StockDetails} />
              <Stack.Screen name="Intraday" component={IntradayStocks} />
              <Stack.Screen name="Swing" component={SwingStocks} />
              <Stack.Screen name="Logs" component={IntradayLogs} />
              <Stack.Screen name="Slots" component={SwingSlots} />
              <Stack.Screen name="SlotDetails" component={NewSlot} />
              <Stack.Screen name="SlotTransactions" component={Transactions} />
            </Stack.Navigator>
          </NavigationContainer>

}

export default AppNavigation;