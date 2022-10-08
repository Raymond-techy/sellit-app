import React, { useState, useEffect } from "react";
import { Image, Text, StyleSheet, View, FlatList } from "react-native";
import ListItem from "../Components/ListItem";
import Colors from "../config/Colors";
import Screen from "../Components/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import listingApi from "../Firebase/Api";

function ListingDetails({ route, navigation }) {
  const [seller, setSeller] = useState(null);
  const { listing } = route.params;
  const auth = getAuth();
  useEffect(() => {
    const getSeller = async () => {
      const user = await listingApi.getUser(listing.sellerRef);
      console.log(user);
      setSeller(user);
    };
    getSeller();
  }, [listing.sellerRef, listing.sellerRef]);

  const [selectedImage, setSelectedImage] = useState(listing.images[0]);
  const handleSelect = (imgSrc) => {
    setSelectedImage(imgSrc);
  };
  return (
    <Screen>
      <View style={styles.listingDet}>
        <Image style={styles.listingImg} source={{ uri: selectedImage }} />
        <View>
          <FlatList
            numColumns={3}
            keyExtractor={(item) => item}
            data={listing.images}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Image
                  style={
                    selectedImage === item
                      ? styles.currentImg
                      : styles.selectedImg
                  }
                  source={{ uri: item }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.detContainer}>
          <Text style={styles.productName}>{listing.title}</Text>
          <Text style={styles.productPrice}>{"$" + listing.price}</Text>
        </View>

        {seller && auth.currentUser.uid !== listing.sellerRef ? (
          <ListItem
            title={seller.name}
            imgURL={seller.imgurl}
            handlePress={() =>
              navigation.navigate("messaging", {
                screen: "Chat",
                params: {
                  name: seller.name,
                  imgurl: seller.imgurl,
                  ref: listing.sellerRef,
                },
              })
            }
            subtitle="Product owner"
          />
        ) : (
          auth.currentUser.uid === listing.sellerRef && (
            <Text>You Own This Product</Text>
          )
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  currentImg: {
    borderWidth: 2,
    borderColor: Colors.primary,
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 12,
  },
  selectedImg: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 12,
  },
  productName: {
    fontSize: 19,
    paddingBottom: 8,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 18,
    color: Colors.secondary,
    fontWeight: "700",
  },
  detContainer: {
    padding: 15,
  },
  listingImg: {
    width: "100%",
    height: 300,
  },
  listingDet: {
    flex: 1,
  },
});

export default ListingDetails;
