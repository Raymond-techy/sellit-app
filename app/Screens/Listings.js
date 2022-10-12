import React, { useEffect, useState } from "react";
import { RefreshControl, View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import ActivityIndicator from "../Components/ActivityIndicator";
import Card from "../Components/Card";
import Screen from "../Components/Screen";

import listingApi from "../Firebase/Api";
import AppButton from "../Components/AppButton";
import Colors from "../config/Colors";
import { Paginate } from "../Components/Hooks/Paginate";
import Pagination from "../Components/Pagination";
import AppTextInput from "../Components/AppTextInput";
import Container, { Toast } from "toastify-react-native";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";

function Listings() {
  const auth = getAuth();
  const navigation = useNavigation();
  const [listings, setListings] = useState([]);
  const [pagListings, setPagListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const pageSize = 5;
  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setLoading(true);
    const items = await listingApi.fetchListings().catch((err) => {
      setListingError(true);
      setLoading(false);
      return;
    });
    setPagListings(items);
    const listingPag = Paginate(items, currentPage, pageSize);
    setListings(listingPag);
    setLoading(false);
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleRefresh = React.useCallback(() => {
    setRefresh(true);
    loadListings();
    wait(2000).then(() => setRefresh(false));
  }, []);
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    const listingPag = Paginate(pagListings, page, pageSize);
    setListings(listingPag);
  };
  const handleWish = async (wish) => {
    const itemRef = collection(db, "wishlists");
    const queries = query(itemRef, where("id", "==", wish.id), limit(1));
    const querySnap = await getDocs(queries);
    if (querySnap.empty) {
      try {
        await listingApi.postWish(wish);
        Toast.success("Item successfully added to Wish");
      } catch (error) {
        Toast.error("An error occured while adding item");
      }
      return;
    } else {
      Toast.warn("Item already exist in wishLists");
    }
  };
  const queryListing = searchQuery
    ? pagListings.filter((pag) =>
        pag.data.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : listings;
  return (
    <Screen>
      <Container />
      {listingError && (
        <View>
          <Text style={styles.text}>Couldn't fetch Listings</Text>
          <AppButton handlePress={loadListings} title="Retry" />
        </View>
      )}
      <ActivityIndicator visible={loading} />
      <AppTextInput
        placeholder="Search product"
        style={styles.style}
        value={searchQuery}
        onChangeText={(text) => {
          setCurrentPage(1);
          setSearchQuery(text);
        }}
      />
      <ScrollView
        style={styles.listings}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
      >
        {queryListing.map((listing) => (
          <Card
            wishIcon={
              auth.currentUser.uid !== listing.data.sellerRef ? true : false
            }
            sellerBadge={
              auth.currentUser.uid === listing.data.sellerRef ? true : false
            }
            key={uuid.v4()}
            handleAddToWish={() => handleWish(listing)}
            title={listing.data.title}
            subTitle={
              "$" + listing.data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            image={listing.data.images[0]}
            onPress={() =>
              navigation.navigate("listingDetails", { listing: listing.data })
            }
          />
        ))}
        <Pagination
          itemsCount={pagListings.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  listings: {
    overflow: "hidden",
    flex: 1,
    height: "100%",
    backgroundColor: "#f8f4f4",
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  text: {
    color: Colors.danger,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "nunito-bold",
  },
  style: {
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    height: 35,
    borderColor: Colors.medium,
  },
});
export default Listings;
