import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Container, { Toast } from "toastify-react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import AppFormFIeld from "../Components/AppFormFIeld";
import SubmitButton from "../Components/SubmitButton";
import Screen from "../Components/Screen";
import AuthApi from "../Firebase/AuthApi";
import AuthContext from "../Context/AuthContext";
import ActivityIndicator from "../Components/ActivityIndicator";
import Colors from "../config/Colors";

const validationSchema = Yup.object().shape({
  password: Yup.string().required().min(4).label("Password"),
  email: Yup.string().required().email().label("Email"),
});

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
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
      <ActivityIndicator visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
              <View>
                <MaterialCommunityIcons
                  name={!visible ? "eye" : "eye-off"}
                  color={Colors.medium}
                  size={30}
                  style={styles.passEye}
                  onPress={() => setVisible((prevState) => !prevState)}
                />
                <AppFormFIeld
                  spellCheck={false}
                  name="password"
                  secureTextEntry={!visible}
                  iconName="lock"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Password"
                />
              </View>
              <SubmitButton title="Login" />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  passEye: {
    position: "absolute",
    right: 10,
    zIndex: 10,
    top: 17,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 10,
  },
});
