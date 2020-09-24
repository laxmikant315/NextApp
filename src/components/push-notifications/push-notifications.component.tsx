import React, { useEffect, useState, useContext } from "react";
import { Notifications } from "expo";
import Constants from 'expo-constants'
import * as Permissions from "expo-permissions";
import { Platform, Vibration } from "react-native";
import { registerPush } from "../../services/stock.service";
import { AppContext } from "../../providers/app.provider";
const PushNotifications = () => {
  let _notificationSubscription;

  useEffect(() => {
    registerForPushNotificationsAsync().then((x) => {
      console.log("Registered completed");
    });

    _notificationSubscription = Notifications.addListener(handleNotification);
  }, []);

  const [expoPushToken, setExpoPushToken] = useState("");

  const [notification, setNotification] = useState<any>({});

  const { setIntradayStocks, setSwingStocks } = useContext(AppContext);

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        const token = await Notifications.getExpoPushTokenAsync();

       
        console.log(token);
        setExpoPushToken(token);

        await registerPush(token).catch((e) => {
          alert("Failed to register push notifications.");
        });

        console.log("Registered for push notificatios");
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
          name: "default",
          sound: true,
          priority: "max",
          vibrate: [0, 250, 250, 250, 0, 250, 250, 250],
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleNotification = (notification: any) => {
    Vibration.vibrate(3);
    console.log(notification);
    setNotification(notification);
  };

  useEffect(() => {
    if (notification && notification.data) {
      if ((notification.data.data && notification.data.data.type === "swing")) {
        setSwingStocks((prev: any) => [notification.data.data, ...prev]);
      } else {
        setIntradayStocks((prev: any) => [notification.data.data, ...prev]);
      }
    }
  }, [notification]);
  return null;
};
export default PushNotifications;
