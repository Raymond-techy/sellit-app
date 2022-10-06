import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppPicker from "./AppPicker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
export default function AppFormPicker({
  items,
  name,
  PickerItemComponent,
  placeholder,
  numberOfColumns,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        style={{ width: "50%" }}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({});
