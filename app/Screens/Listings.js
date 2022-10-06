import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActivityIndicator from "../Components/ActivityIndicator";
import Card from "../Components/Card";
import Screen from "../Components/Screen";

import listingApi from "../Firebase/Api";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    loadListings();
  }, []);
  const loadListings = async () => {
    try {
      setLoading(true);
      const items = await listingApi.fetchListings();
      setListings(items);
      setLoading(false);
    } catch (error) {
      console.log(error, "An error occured");
    }
  };

  const navigation = useNavigation();
  return (
    <Screen>
      <ActivityIndicator visible={loading} />
      <View style={styles.listings}>
        <FlatList
          refreshing={refresh}
          onRefresh={() => loadListings()}
          showsVerticalScrollIndicator={false}
          data={listings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item: { id, data } }) => (
            <Card
              title={data.title}
              subTitle={"$" + data.price}
              image={data.images[0]}
              onPress={() =>
                navigation.navigate("listingDetails", { listing: data })
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  listings: {
    overflow: "hidden",
    flex: 1,
    backgroundColor: "#f8f4f4",
    paddingHorizontal: 20,
    // paddingTop: 30,
  },
});
export default Listings;
