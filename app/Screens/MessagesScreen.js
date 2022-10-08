import { getAuth } from "firebase/auth";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, FlatList, Text, View } from "react-native";
import { db } from "../../firebase.config";
import ListItem from "../Components/ListItem";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import ListItmSep from "../Components/ListItmSep";
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
            console.log(doc.data());
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
            console.log(doc.data());
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
    };

    if (focus === true) getChat();

    setMessages([...received, ...sent]);
    console.log(messages, "All messages sent and received");
  }, [focus, auth.currentUser.uid]);

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
    <Screen>
      {messages.length >= 1 && (
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
                      navigation.navigate("messaging", {
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
                        navigation.navigate("messaging", {
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
      )}

      {/* {messages.length >= 1 && (
        <FlatList
          data={messages.sort((a, b) => b.date - a.date)}
          refreshing={refresh}
          onRefresh={() => console.log("first")}
          renderItem={({
            item: { sender, ref, lastMessage, senderId, receiver, receiverId },
          }) => {
            receiverId === auth.currentUser.uid && (
              <ListItem
                title={sender.name}
                subtitle={lastMessage}
                imgURL={sender.img}
                handlePress={() =>
                  navigation.navigate("messaging", {
                    screen: "Chat",
                    params: {
                      name: sender.name,
                      imgurl: sender.img,
                      ref: sender.ref,
                    },
                  })
                }
                renderRightActions={() => (
                  <ListItemDeleteAction
                    handlePress={() => handleDeleteMsg(item.id)}
                  />
                )}
              />
            );
          }}
          keyExtractor={(message) => message.uid}
          ItemSeparatorComponent={() => <ListItmSep />}
        />
      )} */}
    </Screen>
  );
}

export default MessagesScreen;
