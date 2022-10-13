import React, { useCallback, useState, useEffect, useRef } from "react";
import { useFonts } from "expo-font";
import Container from "toastify-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavTheme from "./app/Navigation/NavTheme";
import AppNavigator from "./app/Navigation/AppNavigator";
import OfflineNotice from "./app/Components/OfflineNotice";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import AuthContext from "./app/Context/AuthContext";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();
export default function App() {
  const [user, setUser] = useState();
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        }
        onLayOutRootView();
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const [fontsLoaded] = useFonts({
    "nunito-regular": require("./app/assets/Fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./app/assets/Fonts/Nunito-Bold.ttf"),
  });

  const onLayOutRootView = useCallback(async () => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 100);
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={NavTheme}>
        <Container />
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
