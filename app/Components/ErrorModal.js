import { StyleSheet, Text, View, Modal, Button } from "react-native";
import React from "react";
import Colors from "../config/Colors";

export default function ErrorModal({ visible, closeModal, Retry }) {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.error}>
        <Text numberOfLines={2} style={styles.errorTxt}>
          An error occured while processing your request
        </Text>
        <Button title="Close" onPress={closeModal} style={styles.btn} />
        {Retry && <Button title="Retry" onPress={Retry} style={styles.btn} />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  error: {
    width: 200,
    height: 150,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: 15,
    backgroundColor: "rgba(52, 52, 52, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorTxt: {
    textAlign: "center",
    color: Colors.white,
    fontWeight: "bold",
    padding: 15,
  },
  btn: {
    backgroundColor: "rgba(52, 52, 52, 1)",
  },
});
