import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import AppFormFIeld from "../Components/AppFormFIeld";
import SubmitButton from "../Components/SubmitButton";
import AppFormPicker from "../Components/AppFormPicker";
import CategoryPickerItem from "../Components/CategoryPickerItem";
import ImageFormPicker from "../Components/ImageFormPicker";
import UseLocation from "../Components/Hooks/UseLocation";
import Screen from "../Components/Screen";
import listingsApi from "../Firebase/Api";
import ErrorModal from "../Components/ErrorModal";
import ActivityIndicator from "../Components/ActivityIndicator";
import { useNavigation } from "@react-navigation/native";
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.string().required().min(1).label("Price"),
  imgurl: Yup.array()
    .min(1, "Please select at least one image")
    .max(4, "Images should not exceed 4 Items")
    .label("Images"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});
const categories = [
  {
    bgColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    bgColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    bgColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    bgColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    bgColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    bgColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    bgColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    bgColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    bgColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];
export default function ListingEditScreen() {
  const location = UseLocation();
  const navigation = useNavigation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const handleSubmit = async (listing) => {
    setLoading(true);
    await listingsApi.postListings(listing).catch((err) => {
      setError(true);
      setLoading(false);
      return;
    });
    setLoading(false);
    setComplete(true);
    setTimeout(() => {
      setComplete(false);
    }, 3000);
    navigation.navigate("Home");
  };

  return (
    <Screen>
      <ActivityIndicator
        visible={loading}
        source={require("../assets/animations/loader.json")}
      />
      <ActivityIndicator
        visible={complete}
        source={require("../assets/animations/done.json")}
      />
      <ErrorModal visible={Error} closeModal={() => setError(false)} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={require("../assets/SellIT.png")} style={styles.logo} />
          <Formik
            initialValues={{
              title: "",
              price: "",
              description: "",
              category: null,
              imgurl: [],
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <>
              <AppFormFIeld
                name="title"
                maxLength={225}
                textContentType="emailAddress"
                autoCorrect={false}
                autoCapitalize
                placeholder="Product Name"
              />
              <AppFormFIeld
                name="price"
                keyboardType="numeric"
                maxLength={8}
                placeholder="Price(#0,000.00)"
              />
              <AppFormPicker
                numberOfColumns={3}
                items={categories}
                placeholder="category"
                name="category"
                PickerItemComponent={CategoryPickerItem}
              />
              <AppFormFIeld
                maxLength={255}
                multiline
                name="description"
                numberOfLines={4}
                placeholder="Description"
              />

              <ImageFormPicker name="imgurl" />
              <SubmitButton title="Sell It" />
            </>
          </Formik>
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
});
