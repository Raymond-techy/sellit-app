import React, { useEffect, useContext, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SubmitButton from "../Components/SubmitButton";
import Screen from "../Components/Screen";
import AppFormFIeld from "../Components/AppFormFIeld";
import AuthApi from "../Firebase/AuthApi";
import ImageFormPicker from "../Components/ImageFormPicker";
import Container, { Toast } from "toastify-react-native";
import ActivityIndicator from "../Components/ActivityIndicator";
import AuthContext from "../Context/AuthContext";
import Colors from "../config/Colors";

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
  const [visible, setVisible] = useState(false);
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

  async function schedulePushNotification(message, subTitle) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: message,
        body: subTitle,
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = {
        ...values,
        token: expoPushToken,
      };
      const user = await AuthApi.createUser(formData);
      setLoading(false);
      setUser(user);
      await schedulePushNotification(
        "Registeration Successful",
        "Your account has been sucessfully Registered"
      );
    } catch (err) {
      setLoading(false);
      if (err === "auth/email-already-in-use") {
        setLoading(false);
        Toast.error("email already exist");
        return;
      }
      Toast.error("Error with information upload");
      return;
    }
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
              <View>
                <MaterialCommunityIcons
                  name={!visible ? "eye" : "eye-off"}
                  color={Colors.medium}
                  size={30}
                  style={styles.passEye}
                  onPress={() => setVisible((prevState) => !prevState)}
                />
                <AppFormFIeld
                  // keyboardType=""
                  spellCheck={false}
                  name="password"
                  secureTextEntry={!visible}
                  iconName="lock"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Password"
                />
              </View>
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
    fontFamily: "nunito-bold",
    paddingVertical: 10,
  },
  passEye: {
    position: "absolute",
    right: 10,
    zIndex: 10,
    top: 17,
  },
});
