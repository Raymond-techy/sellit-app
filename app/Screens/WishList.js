import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Screen from "../Components/Screen";
import listingApi from "../Firebase/Api";

export default function WishList() {
  useEffect(() => {
    const listings = listingApi.fetchWishList();
    console.log(listings);
  }, []);

  return <Screen></Screen>;
}

const styles = StyleSheet.create({});
