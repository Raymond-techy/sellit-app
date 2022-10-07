import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ActivityIndicator from "../Components/ActivityIndicator";
import Card from "../Components/Card";
import Screen from "../Components/Screen";

import listingApi from "../Firebase/Api";
import AppButton from "../Components/AppButton";
import Colors from "../config/Colors";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    loadListings();
  }, []);
  const loadListings = async () => {
    setLoading(true);
    const items = await listingApi.fetchListings().catch((err) => {
      setError(true);
      setLoading(false);
    });
    setListings(items);
    setLoading(false);
  };

  const navigation = useNavigation();
  return (
    <Screen>
      {error && (
        <View>
          <Text style={styles.text}>Couldn't fetch Listings</Text>
          <AppButton handlePress={loadListings} title="Retry" />
        </View>
      )}
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
  text: {
    color: Colors.danger,
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default Listings;
