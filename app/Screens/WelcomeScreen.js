import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, View, ImageBackground, StyleSheet, Text } from "react-native";
import AppButton from "../Components/AppButton";
useNavigation;
function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      blurRadius={8}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image source={require("../assets/SellIT.png")} style={styles.logo} />
      </View>
      <View style={styles.btn}>
        <AppButton
          color="primary"
          title="Login"
          handlePress={() => navigation.navigate("login")}
        />
        <AppButton
          color="secondary"
          title="Register"
          handlePress={() => navigation.navigate("register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
  },
});
export default WelcomeScreen;
