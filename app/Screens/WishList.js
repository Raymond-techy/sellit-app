import { View, StyleSheet, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../Components/Screen";
import { db } from "../../firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import listingApi from "../Firebase/Api";

import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import ListItem from "../Components/ListItem";
import ListItmSep from "../Components/ListItmSep";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import Skeleton from "../Components/skeleton";

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
          myWish.push({ ...doc.data(), id: doc.id });
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
  };

  const twoButtonAlert = (itemId) => {
    Alert.alert("Delete item", "Are you sure to delete this wish Item", [
      {
        text: "Yes",
        onPress: () => handleDeleteWish(itemId),
      },
      {
        text: "No",
      },
    ]);
  };
  const handleDeleteWish = async (wishID) => {
    await deleteDoc(doc(db, "wishlists", wishID));
    const updatedWish = wishList.filter((wish) => wish.id !== wishID);
    setWishList(updatedWish);
  };
  return (
    <Screen>
      {wishList.length >= 1 ? (
        <View style={styles.wishList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={wishList}
            keyExtractor={(item) => (item.id + random).toString()}
            ItemSeparatorComponent={() => <ListItmSep />}
            renderItem={({ item }) => (
              <ListItem
                chevron={false}
                title={item.data.title}
                imgURL={item.data.images[0]}
                chatBtn={true}
                chatSeller={() => chatSeller(item.data.sellerRef)}
                subtitle={
                  "$" + item.data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                renderRightActions={() => (
                  <ListItemDeleteAction
                    handlePress={() => twoButtonAlert(item.id)}
                  />
                )}
              />
            )}
          />
        </View>
      ) : (
        <Skeleton />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  wishList: {
    // overflow: "hidden",
    // flex: 1,
    // alignItems: "center",
    // padding: 20,
  },
});
