import React, { useEffect, useContext, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Formik } from "formik";
import * as Yup from "yup";

import SubmitButton from "../Components/SubmitButton";
import Screen from "../Components/Screen";
import AppFormFIeld from "../Components/AppFormFIeld";
import AuthApi from "../Firebase/AuthApi";
import ImageFormPicker from "../Components/ImageFormPicker";
import Container, { Toast } from "toastify-react-native";
import ActivityIndicator from "../Components/ActivityIndicator";
import AuthContext from "../Context/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  name: Yup.string().required().label("Name"),
  imgurl: Yup.array().max(1, "Just one image required").label("Images"),
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function RegisterScreen() {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Registeration Successful",
        body: "Your account has been sucessfully Registered",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = {
      ...values,
      token: expoPushToken,
    };
    const user = await AuthApi.createUser(formData).catch((err) => {
      setLoading(false);
      if (err === "auth/email-already-in-use") {
        Toast.error("email already exist");
      }
      Toast.error("Error with information upload");
      return;
    });
    setLoading(false);
    setUser(user);
    await schedulePushNotification();
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
    fontFamily: "nunito-bold",
  },
  login: {
    textAlign: "center",
    color: "dodgerblue",
    fontFamily: "nunito-regular",
  },
});
