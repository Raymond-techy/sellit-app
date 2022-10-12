import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "../Components/Card";
import Screen from "../Components/Screen";
import Colors from "../config/Colors";
import listingApi from "../Firebase/Api";
import ActivityIndicator from "../Components/ActivityIndicator";

export default function MyLIstings({ navigation }) {
  const [myListings, setMyListings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    loadMyListings();
    setLoading(false);
  }, []);
  const loadMyListings = async () => {
    const listings = await listingApi.fetchMyListings();
    setMyListings(listings);
  };

  return (
    <Screen>
      {myListings && (
        <View style={styles.listings}>
          <Text style={styles.header}>My Listings</Text>
          <ActivityIndicator visible={loading} />
          <FlatList
            refreshing={refresh}
            onRefresh={() => loadMyListings()}
            showsVerticalScrollIndicator={false}
            data={myListings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: { id, data } }) => (
              <Card
                title={data.title}
                subTitle={
                  "$" + data.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                image={data.images[0]}
                onPress={() =>
                  navigation.navigate("listingDetails", { listing: data })
                }
              />
            )}
          />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  listings: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light,
  },
  header: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
});
