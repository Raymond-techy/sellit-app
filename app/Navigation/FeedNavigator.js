import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listings from "../Screens/Listings";
import ListingDetails from "../Screens/ListingDetails";
function FeedNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Listings} />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export default FeedNavigator;
