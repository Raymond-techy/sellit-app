import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import ListingEditScreen from "../Screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import MessageNavigator from "./MessageNavigator";
import WishList from "../Screens/WishList";

function AppNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}
    >
      <Tab.Screen
        name="Explore"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="wishlist"
        component={WishList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="heart-multiple-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="sellIt"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewListingButton
              handlePress={() => navigation.navigate("sellIt")}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Chats"
        component={MessageNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="android-messages"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
