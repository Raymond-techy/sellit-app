import uuid from "react-native-uuid";
import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import ListItem from "../Components/ListItem";
import Colors from "../config/Colors";
import Screen from "../Components/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import listingApi from "../Firebase/Api";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ListingDetails({ route, navigation }) {
  const [seller, setSeller] = useState(null);
  const { listing } = route.params;
  const auth = getAuth();
  const [others, setOthers] = useState([]);
  useEffect(() => {
    const getSeller = async () => {
      const user = await listingApi.getUser(listing.sellerRef);
      setSeller(user);
    };
    const getMore = async () => {
      const otherPro = await listingApi.fetchMyListings(listing.sellerRef);

      setOthers(otherPro);
    };
    getSeller();
    getMore();
  }, [listing.sellerRef]);

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
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.detContainer}>
            <Text style={styles.productName}>{listing.title}</Text>
            <Text style={styles.productPrice}>{"$" + listing.price}</Text>
          </View>

          {seller && auth.currentUser.uid !== listing.sellerRef ? (
            <>
              <ListItem
                chevron={false}
                title={seller.name}
                imgURL={seller.imgurl}
                chatBtn={true}
                chatSeller={() =>
                  navigation.navigate("Chats", {
                    screen: "Chat",
                    params: {
                      name: seller.name,
                      imgurl: seller.imgurl,
                      ref: listing.sellerRef,
                    },
                  })
                }
                subtitle={
                  others.length <= 1
                    ? "Product Owner"
                    : others.length + " " + "Listings"
                }
              />
              <View style={styles.tips}>
                <Text style={styles.txt}>Safety Tips</Text>
                <View style={styles.safety}>
                  <Text style={styles.txtSmall}>
                    Make payments only when you trust the Seller
                  </Text>
                  <Text style={styles.txtSmall}>
                    Inspect the goods posted by the seller before making payment
                  </Text>
                  <Text style={styles.txtSmall}>
                    Meet the seller in an open place
                  </Text>
                </View>
              </View>
            </>
          ) : (
            auth.currentUser.uid === listing.sellerRef && (
              <View style={styles.owner}>
                <MaterialCommunityIcons
                  name="information-variant"
                  color="#38E54D"
                  size={30}
                />
                <Text style={styles.txt}>You Own This Product</Text>
              </View>
            )
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  safety: {
    alignSelf: "flex-start",
  },
  tips: {
    elevation: 20,
    width: "80%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 15,
    marginBottom: 10,
  },
  txtSmall: {
    fontFamily: "nunito-bold",
    paddingBottom: 2,
  },
  owner: {
    width: "80%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 15,
    marginBottom: 10,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "nunito-bold",
  },

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
    fontFamily: "nunito-bold",
    fontSize: 19,
    paddingBottom: 8,
    fontWeight: "bold",
  },
  productPrice: {
    fontFamily: "nunito-bold",
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
  listings: {
    overflow: "",
    flex: 1,
  },
});

export default ListingDetails;
