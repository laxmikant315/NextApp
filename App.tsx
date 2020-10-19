import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";

import { AppLoading, Notifications } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import AppProvider from "./src/providers/app.provider";
import PushNotifications from "./src/components/push-notifications/push-notifications.component";
import AppNavigation from "./AppNavigation.component";
import { Root, Spinner } from "native-base";




export default function App() {
  const [isReady, setIsReady] = useState(false);
 
  useEffect(() => {
    Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    }).then((res) => {
      setIsReady(true);
    });
  });


 

  return (
    <Root>
      {!isReady ? (
        <AppLoading />
      ) : (
        <AppProvider>
       
          <PushNotifications />
            <AppNavigation/>
        </AppProvider>
      )}
    </Root>
  );
}
