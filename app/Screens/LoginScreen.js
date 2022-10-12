import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppFormFIeld from "../Components/AppFormFIeld";
import SubmitButton from "../Components/SubmitButton";
import Screen from "../Components/Screen";
import AuthApi from "../Firebase/AuthApi";
import { useNavigation } from "@react-navigation/native";
import Container, { Toast } from "toastify-react-native";
import AuthContext from "../Context/AuthContext";
import ActivityIndicator from "../Components/ActivityIndicator";
const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(4).label("Password"),
  email: Yup.string().required().email().label("Email"),
});

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleSubmit = async (Values) => {
    setLoading(true);
    const { email, password } = Values;
    try {
      const user = await AuthApi.loginUser(email, password);
      setUser(user);
      return;
    } catch (error) {
      Toast.error("invalid email or password");
      setLoading(false);
    }
  };
  return (
    <Screen>
      <Container />
      <ActivityIndicator />
      <View style={styles.container}>
        <Image source={require("../assets/SellIT.png")} style={styles.logo} />
        {/* <Text>Welcome Back</Text> */}
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <AppFormFIeld
                name="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                iconName="email"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Email"
              />

              <AppFormFIeld
                name="password"
                secureTextEntry
                iconName="lock"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Password"
              />
              <SubmitButton title="Login" />
            </>
          )}
        </Formik>
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
    marginTop: 10,
  },
});
