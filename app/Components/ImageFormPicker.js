import { StyleSheet } from "react-native";
import React from "react";
import ImagePicker from "./ImagePicker";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import * as ImageP from "expo-image-picker";
export default function ImageFormPicker({ name }) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const imageUris = values[name];
  const handleDelete = (itemId) => {
    setFieldValue(
      name,
      imageUris.filter((img) => img.id !== itemId)
    );
  };
  const selectImage = async () => {
    const random = Math.random();
    const result = await ImageP.launchImageLibraryAsync();
    if (!result.cancelled) {
      setFieldValue(name, [...imageUris, { id: random, uri: result.uri }]);
    }
  };

  return (
    <>
      <ImagePicker
        handleAdd={selectImage}
        name={name}
        imageUris={imageUris}
        handleDelete={handleDelete}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
