import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
export default function AppFormFIeld({
  flexStyle,
  style,
  name,
  ...otherProps
}) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext();
  return (
    <>
      <View style={flexStyle}>
        <AppTextInput
          onChangeText={handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          {...otherProps}
          style={style}
        />
        <ErrorMessage visible={touched[name]} error={errors[name]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
