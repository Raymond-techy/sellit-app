import { getAuth } from "firebase/auth";
import { StyleSheet, View, FlatList } from "react-native";
import React, { useContext } from "react";
import ListItem from "../Components/ListItem";
import Colors from "../config/Colors";
import Icon from "../Components/Icon";
import ListItmSep from "../Components/ListItmSep";
import Screen from "../Components/Screen";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../Context/AuthContext";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: Colors.primary,
    },
    target: "myListings",
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: Colors.secondary,
    },
    target: "messages",
  },
];
export default function AccountScreen() {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const logUserOut = () => {
    const auth = getAuth();
    auth.signOut();
    setUser(null);
  };
  return (
    <Screen>
      <View style={styles.screen}>
        <View>
          <ListItem
            title={user.displayName}
            subtitle={user.email}
            imgURL={user.photoURL}
            chevron={false}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.title}
            ItemSeparatorComponent={ListItmSep}
            renderItem={({ item }) => (
              <ListItem
                handlePress={() =>
                  item.target === "messages"
                    ? navigation.navigate("Chats", {
                        screen: "messages",
                      })
                    : navigation.navigate(item.target)
                }
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
              />
            )}
          />
        </View>
        <ListItem
          handlePress={logUserOut}
          title="Logout"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: Colors.light,
    flex: 1,
  },
});
