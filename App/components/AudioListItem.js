import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Color from "../misc/Color";
const AudioListItem = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View styles={styles.thumbnail}>
            <Text style={styles.thumbnailText}>A</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              Title
            </Text>
            <Text style={styles.timeText}>03:59</Text>
          </View>
        </View>
        <View styles={styles.rightContainer}>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={Color.FONT_MEDIUM}
          />
        </View>
      </View>
      <View style={styles.separator}></View>
    </>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 80,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: Color.FONT,
  },
  thumbnail: {
    height: 50,
    backgroundColor: Color.FINT_LIGHT,
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Color.FONT,
  },
  separator: {
    width: width - 80,
    backgroundColor: "#333",
    opacity: 0.3,
    height: 0.5,
    alignSelf: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: Color.FONT_MEDIUM,
  },
});

export default AudioListItem;
