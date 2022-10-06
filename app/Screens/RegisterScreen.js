import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import AppFormFIeld from "../Components/AppFormFIeld";
import SubmitButton from "../Components/SubmitButton";
import Screen from "../Components/Screen";
import AuthApi from "../Firebase/AuthApi";
import ImageFormPicker from "../Components/ImageFormPicker";
import Container, { Toast } from "toastify-react-native";
import ActivityIndicator from "../Components/ActivityIndicator";
import AuthContext from "../Context/AuthContext";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  name: Yup.string().required().label("Name"),
  imgurl: Yup.array().max(1, "Just one image required").label("Images"),
});

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    setLoading(true);
    const { name, email, password, imgurl } = values;
    const user = AuthApi.createUser(name, email, password, imgurl[0].uri).catch(
      (err) => {
        setLoading(false);
        if (err === "auth/email-already-in-use") {
          Toast.error("email already exist");
        }
        Toast.error("Error with information upload");
        return;
      }
    );
    setLoading(false);
    setUser(user);
  };
  const handleLogin = () => {
    navigation.navigate("login");
  };

  return (
    <Screen>
      <Container position="top" />
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Text style={styles.signUp}>Create Your Account</Text>
        <TouchableWithoutFeedback onPress={handleLogin}>
          <Text style={styles.login}>or Login to get started</Text>
        </TouchableWithoutFeedback>
        <Formik
          initialValues={{ email: "", name: "", password: "", imgurl: [] }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {() => (
            <>
              <AppFormFIeld
                name="name"
                iconName="account-cowboy-hat"
                autoCorrect={false}
                autoCapitalize
                placeholder="Name"
              />
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
              <ImageFormPicker name="imgurl" />
              <Text>Upload Profile Pic</Text>
              <SubmitButton title="Register" />
            </>
          )}
        </Formik>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    padding: 15,
  },
  signUp: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  login: {
    textAlign: "center",
    color: "dodgerblue",
  },
});
