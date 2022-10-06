import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import PickerItem from "./PickerItem";

const AppPicker = ({
  PickerItemComponent = PickerItem,
  iconName,
  items,
  selectedItem,
  onSelectItem,
  placeholder,
  numberOfColumns,
  style,
}) => {
  const [ModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, style]}>
          {iconName && (
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              style={styles.icon}
              color={Colors.medium}
            />
          )}
          <Text style={styles.Textstyle}>
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={Colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={ModalVisible} animationType="slide" transparent>
        <View style={styles.category}>
          <MaterialCommunityIcons
            style={styles.closeBtn}
            name="close"
            size={20}
            onPress={() => setModalVisible(false)}
          />
          <FlatList
            data={items}
            numColumns={numberOfColumns}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                handlePress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.light,
    borderRadius: 25,
    borderColor: Colors.light,
    flexDirection: "row",
    padding: 8,
    marginVertical: 10,
    alignItems: "center",
    // marginLeft: "auto",
    // marginRight: "auto",
  },
  icon: {
    marginHorizontal: 10,
  },
  closeBtn: {
    justifyContent: "center",
    color: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 10,
  },
  Textstyle: {
    flex: 1,
  },
  category: {
    position: "absolute",
    bottom: 0,
    height: "70%",
    width: "100%",
    backgroundColor: Colors.light,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
