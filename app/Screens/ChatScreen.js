import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Screen from "../Components/Screen";
import ListItem from "../Components/ListItem";
import Colors from "../config/Colors";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import AppTextInput from "../Components/AppTextInput";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "../../firebase.config";
export default function ChatScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const auth = getAuth();
  const user = route.params;
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const messageID = user.ref + auth.currentUser.uid;
  const sorted = messageID.split("").sort().join("");

  useEffect(() => {
    const getMessages = () => {
      const unsub = () => {
        onSnapshot(doc(db, "messages", sorted), (doc) => {
          doc.exists() && setChats(doc.data().messages);
        });
      };
      unsub();
      console.log(chats, "type of chats");
    };
    getMessages();
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
      tabBarVisible: false,
    });
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation, sorted]);

  const handleSendMessage = async () => {
    if (message.length !== 0) {
      setMessage("");
      const docRef = doc(db, "messages", sorted);
      const formData = {
        message,
        receiverId: user.ref,
        senderId: auth.currentUser.uid,
        timestamp: Timestamp.now(),
      };
      const get = await getDoc(docRef);
      if (get.exists()) {
        await updateDoc(docRef, {
          messages: arrayUnion(formData),
        });
      } else {
        const formDataCopy = { ...formData, messages: [{ ...formData }] };
        delete formDataCopy.message;
        await setDoc(doc(db, "messages", sorted), formDataCopy);
      }
    } else {
      return;
    }
  };

  return (
    <Screen>
      <View style={styles.ChatScreen}>
        <View style={styles.user}>
          <ListItem
            title={user.name}
            imgURL={user.imgurl}
            chevron={false}
            subtitle={"Last seen" + " " + moment().format("LT")}
          />
        </View>
      </View>
      <ScrollView style={styles.chats}>
        {chats.map((chat) => (
          <View key={uuid.v4()}>
            <Text
              style={
                chat.senderId === auth.currentUser.uid
                  ? styles.sent
                  : styles.received
              }
            >
              {chat.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.message}>
        <AppTextInput
          style={styles.input}
          iconName="message-processing"
          multiline
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableHighlight
          underlayColor={Colors.transparent}
          onPress={handleSendMessage}
          style={styles.send}
        >
          <Octicons name="paper-airplane" size={30} color="dodgerblue" />
        </TouchableHighlight>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 87,
    backgroundColor: Colors.primary,
    zIndex: 10,
  },
  message: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: Colors.white,
  },
  chats: {
    paddingTop: 156,
  },
  input: {
    marginRight: 5,
    width: "80%",
  },
  send: {
    padding: 15,
    borderRadius: 35,
    justifyContent: "center",
  },
  received: {
    backgroundColor: Colors.primary,
  },
  sent: {
    backgroundColor: Colors.secondary,
  },
});
