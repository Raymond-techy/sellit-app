import React, { useState } from "react";
import { FlatList } from "react-native";
import ListItem from "../Components/ListItem";
import ListItemDeleteAction from "../Components/ListItemDeleteAction";
import ListItmSep from "../Components/ListItmSep";
import Screen from "../Components/Screen";

function MessagesScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      title:
        "Mosh Hamedani lorem nuinghu niuyn  guinyuind hnyiny hjninuif5 uinuiyni hnyuinuiynumnuinsuin6uyin",
      description: "Aw fa boss",
      image: require("../assets/mosh.jpg"),
    },
    {
      id: 2,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(1).jpg"),
    },
    {
      id: 3,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(4).jpg"),
    },
    {
      id: 4,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh.jpg"),
    },
    {
      id: 5,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(3).jpg"),
    },
    {
      id: 6,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(1).jpg"),
    },
    {
      id: 7,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh.jpg"),
    },
    {
      id: 8,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(3).jpg"),
    },
    {
      id: 9,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh.jpg"),
    },
    {
      id: 10,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(4).jpg"),
    },
    {
      id: 11,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(4).jpg"),
    },
    {
      id: 12,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh.jpg"),
    },
    {
      id: 13,
      title: "Eng. Bello",
      description: "Where you dey?",
      image: require("../assets/mosh(4).jpg"),
    },
  ]);
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
      <FlatList
        data={messages}
        refreshing={refresh}
        onRefresh={() => console.log("refreshed")}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            imgSrc={item.image}
            handlePress={() => console.log(item)}
            renderRightActions={() => (
              <ListItemDeleteAction
                handlePress={() => handleDeleteMsg(item.id)}
              />
            )}
          />
        )}
        keyExtractor={(message) => message.id.toString()}
        ItemSeparatorComponent={() => <ListItmSep />}
      />
    </Screen>
  );
}

export default MessagesScreen;
