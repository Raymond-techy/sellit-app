import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import _ from "lodash";

export default function Pagination({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <View>
      <View style={styles.nav}>
        {pages.map((page) => (
          <TouchableWithoutFeedback
            key={page}
            onPress={() => onPageChange(page)}
          >
            <Text style={page === currentPage ? styles.selected : styles.page}>
              {page}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  selected: {
    padding: 10,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 3,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderColor: "dodgerblue",
    borderWidth: 2,
    borderRadius: 3,
    marginRight: 3,
  },
});
