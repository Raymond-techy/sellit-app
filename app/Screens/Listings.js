import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import ActivityIndicator from "../Components/ActivityIndicator";
import Card from "../Components/Card";
import Screen from "../Components/Screen";

import Container, { Toast } from "toastify-react-native";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import listingApi from "../Firebase/Api";
import AppButton from "../Components/AppButton";
import Colors from "../config/Colors";
import { Paginate } from "../Components/Hooks/Paginate";
import Pagination from "../Components/Pagination";
import AppTextInput from "../Components/AppTextInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const categories = [
  {
    label: "All",
    value: 0,
  },
  {
    label: "Furniture",
    value: 1,
  },
  {
    label: "Cars",
    value: 2,
  },
  {
    label: "Games",
    value: 4,
  },
  {
    label: "Sports",
    value: 6,
  },
  {
    label: "Clothing",
    value: 5,
  },

  {
    label: "Movies & Music",
    value: 7,
  },
  {
    label: "Cameras",
    value: 3,
  },
  {
    label: "Books",
    value: 8,
  },
];
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
  const [selectedCatg, setSelectedCatg] = useState("All");
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
    const auth = getAuth();
    const itemRef = collection(db, "wishlists");
    const queries = query(
      itemRef,
      where("wishRef", "==", auth.currentUser.uid),
      where("id", "==", wish.id),
      limit(1)
    );
    const querySnap = await getDocs(queries);
    if (querySnap.empty) {
      try {
        await listingApi.postWish(wish);
        Toast.success("Item successfully added to Wish");
      } catch (error) {
        Toast.error("An error occured while adding item");
      }
    } else {
      Toast.warn("Item already exist in wishLists");
    }
  };
  const handleCatgSelect = (label) => {
    setSelectedCatg(label);
    const pagData =
      label === "All"
        ? pagListings
        : pagListings.filter(
            (pag) =>
              pag.data.category.label.toLowerCase() === label.toLowerCase()
          );
    setListings(pagData);
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
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableWithoutFeedback
              key={item.value}
              onPress={() => handleCatgSelect(item.label)}
            >
              <View
                style={
                  selectedCatg === item.label
                    ? styles.selectedCateg
                    : styles.categ
                }
              >
                <Text
                  style={{
                    fontFamily: "nunito-regular",
                    fontWeight: "900",
                    color: selectedCatg === item.label ? "#fff" : "#000",
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </View>
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
    marginTop: -4,
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    height: 35,
    borderColor: Colors.secondary,
  },
  categ: {
    height: 30,
    backgroundColor: Colors.light,
    margin: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCateg: {
    height: 30,
    backgroundColor: Colors.primary,
    margin: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Listings;
