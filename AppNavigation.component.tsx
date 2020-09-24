
import React ,{useEffect, useContext}from 'react';
import { getConfig } from './src/services/stock.service';
import { AppContext } from './src/providers/app.provider';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from './src/screens/home/home.component';

import StockDetails from "./src/screens/stock-details/stock-details.component";

const Stack = createStackNavigator();
const AppNavigation = ()=>{



    const {setConfig} = useContext(AppContext)
    useEffect(()=>{
        getConfig().then(config=>{
          setConfig(config)
        })
      },[])

      return <>
      <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Stock" component={StockDetails} />
            </Stack.Navigator>
          </NavigationContainer></>

}

export default AppNavigation;