import React, { useState, useEffect, useRef } from "react";
import Container from "toastify-react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavTheme from "./app/Navigation/NavTheme";
import AppNavigator from "./app/Navigation/AppNavigator";
import OfflineNotice from "./app/Components/OfflineNotice";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import AuthContext from "./app/Context/AuthContext";

const Tab = createBottomTabNavigator();
export default function App() {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);
  // if (checkingStatus) return <AppLoading />;
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
