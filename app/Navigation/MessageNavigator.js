import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../Screens/ChatScreen";
import MessagesScreen from "../Screens/MessagesScreen";
function MessageNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="messages"
    >
      <Stack.Screen name="messages" component={MessagesScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ presentation: "modal", tabBarVisible: false }}
      />
    </Stack.Navigator>
  );
}

export default MessageNavigator;
