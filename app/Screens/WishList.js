import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../Components/Screen";
import { db } from "../../firebase.config";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import listingApi from "../Firebase/Api";

import { getAuth } from "firebase/auth";
import WishItem from "../Components/WishItem";
import { useIsFocused } from "@react-navigation/native";

export default function WishList({ navigation }) {
  const [wishList, setWishList] = useState([]);
  const random = Math.random();
  const focus = useIsFocused();

  useEffect(() => {
    const auth = getAuth();
    const myWishRef = collection(db, "wishlists");
    const queries = query(
      myWishRef,
      where("wishRef", "==", auth.currentUser.uid),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = () => {
      onSnapshot(queries, (querySnapshot) => {
        const myWish = [];
        querySnapshot.forEach((doc) => {
          myWish.push(doc.data());
        });
        setWishList(myWish);
      });
    };
    unsubscribe();
  }, [focus]);
  const chatSeller = async (ref) => {
    const { name, imgurl, userRef } = await listingApi.getUser(ref);
    navigation.navigate("Chats", {
      screen: "Chat",
      params: {
        name: name,
        imgurl: imgurl,
        ref: userRef,
      },
    });
    console.log(userRef);
  };
  return (
    <Screen>
      <View style={styles.wishList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={wishList}
          keyExtractor={(item) => (item.id + random).toString()}
          renderItem={({ item: { id, data } }) => (
            <WishItem
              title={data.title}
              subTitle={"$" + data.price}
              image={data.images[0]}
              handleChat={() => chatSeller(data.sellerRef)}
              // onPress={() =>
              //   navigation.navigate("listingDetails", { listing: data })
              // }
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wishList: {
    overflow: "hidden",
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});
