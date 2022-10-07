import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../Screens/MessagesScreen";
import AccountScreen from "../Screens/AccountScreen";
import MyLIstings from "../Screens/MyLIstings";
function AccountNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="accountScreen"
        options={{ headerTitle: "Account" }}
        component={AccountScreen}
      />

      <Stack.Screen
        name="myListings"
        component={MyLIstings}
        options={{ title: "MY LISTINGS" }}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
