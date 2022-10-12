import { getAuth } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import { db } from "../../firebase.config";
import ListItem from "../Components/ListItem";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import Screen from "../Components/Screen";
import uuid from "react-native-uuid";
import { useIsFocused } from "@react-navigation/native";

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

  const [refresh, setRefresh] = useState(false);
  const handleDeleteMsg = (itemID) => {
    setRefresh(true);
    const newMessages = messages.filter((message) => message.id !== itemID);
    setMessages(newMessages);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  return (
    <>
      <Screen>
        {messages.length >= 1 ? (
          <ScrollView>
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
                          handlePress={() => handleDeleteMsg(item.id)}
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
                            handlePress={() => handleDeleteMsg(item.id)}
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
            <Text style={styles.txt}>
              You Currently Have No messages at The Moment Chat a seller to Get
              Started!
            </Text>
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
  txt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
  },
});
export default MessagesScreen;
