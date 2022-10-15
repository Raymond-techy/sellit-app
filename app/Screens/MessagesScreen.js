import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, Alert } from "react-native";
import { db } from "../../firebase.config";
import ListItem from "../Components/ListItem";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import Screen from "../Components/Screen";
import uuid from "react-native-uuid";
import { useIsFocused } from "@react-navigation/native";
import Skeleton from "../Components/skeleton";
import Colors from "../config/Colors";

function MessagesScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const auth = getAuth();
  const focus = useIsFocused();
  useEffect(() => {
    const getChat = async () => {
      const docRef = collection(db, "messages");
      const q = query(docRef, where("senderId", "!=", auth.currentUser.uid));
      const q2 = query(docRef, where("receiverId", "!=", auth.currentUser.uid));
      const unsubscribe = () => {
        onSnapshot(q, (querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              receiver: doc.data().receiverDetails,
              sender: doc.data().senderDetails,
              lastMessage: doc.data().lastMessage,
              date: doc.data().timestamp,
              id: doc.id,
            });
          });
          setSent(messages);
        });
      };
      const unsub = () => {
        onSnapshot(q2, (querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              receiver: doc.data().receiverDetails,
              sender: doc.data().senderDetails,
              lastMessage: doc.data().lastMessage,
              date: doc.data().timestamp,
              id: doc.id,
            });
          });
          setReceived(messages);
        });
      };
      unsub();
      unsubscribe();
      setMessages([...received, ...sent]);
    };
    getChat();
  }, [focus]);

  const twoButtonAlert = (itemId) => {
    Alert.alert(
      "Delete conversation",
      "Are you sure to delete this conversation",
      [
        {
          text: "Yes",
          onPress: () => handleDeleteMsg(itemId),
        },
        {
          text: "No",
        },
      ]
    );
  };
  const handleDeleteMsg = async (msgID) => {
    await deleteDoc(doc(db, "messages", msgID));
    const updatedMsgs = messages.filter((message) => message.id !== msgID);
    setMessages(updatedMsgs);
  };

  return (
    <>
      <Screen>
        {messages.length >= 1 ? (
          <ScrollView style={styles.chatt}>
            {messages
              .sort((a, b) => b.date - a.date)
              .map((message) => (
                <View key={uuid.v4()}>
                  {message.receiver.ref === auth.currentUser.uid ? (
                    <ListItem
                      title={message.sender.name}
                      subtitle={message.lastMessage}
                      imgURL={message.sender.img}
                      handlePress={() =>
                        navigation.navigate("Chats", {
                          screen: "Chat",
                          params: {
                            name: message.sender.name,
                            imgurl: message.sender.img,
                            ref: message.sender.ref,
                          },
                        })
                      }
                      renderRightActions={() => (
                        <ListItemDeleteAction
                          handlePress={() => twoButtonAlert(message.id)}
                        />
                      )}
                      chevron={false}
                    />
                  ) : (
                    message.sender.ref === auth.currentUser.uid && (
                      <ListItem
                        title={message.receiver.name}
                        subtitle={message.lastMessage}
                        imgURL={message.receiver.img}
                        handlePress={() =>
                          navigation.navigate("Chats", {
                            screen: "Chat",
                            params: {
                              name: message.receiver.name,
                              imgurl: message.receiver.img,
                              ref: message.receiver.ref,
                            },
                          })
                        }
                        chevron={false}
                        renderRightActions={() => (
                          <ListItemDeleteAction
                            handlePress={() => twoButtonAlert(message.id)}
                          />
                        )}
                      />
                    )
                  )}
                </View>
              ))}
          </ScrollView>
        ) : (
          <View style={styles.noChat}>
            <Skeleton />
          </View>
        )}
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  noChat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Chatt: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
export default MessagesScreen;
