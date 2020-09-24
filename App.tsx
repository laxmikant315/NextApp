import "react-native-gesture-handler";
import React, { useState } from "react";

import { AppLoading, Notifications } from "expo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import AppProvider from "./src/providers/app.provider";
import PushNotifications from "./src/components/push-notifications/push-notifications.component";
import AppNavigation from "./AppNavigation.component";




export default function App() {
  const [isReady, setIsReady] = useState(false);
 
  useState(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    }).then((res) => {
      setIsReady(true);
    });
  });


 

  return (
    <>
      {!isReady ? (
        <AppLoading />
      ) : (
        <AppProvider>
          <PushNotifications />
            <AppNavigation/>
        </AppProvider>
      )}
    </>
  );
}
