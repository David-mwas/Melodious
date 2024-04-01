import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Screen from "../components/Screen";
import Color from "../misc/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Player = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>1/99</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={300}
            color={Color.ACTIVE_BG}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text style={styles.audioTitle} numberOfLines={1}>
            Audio file name
          </Text>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: Color.FINT_LIGHT,
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  audioTitle: {
    fontSize: 16,
    color: Color.FONT,
    padding: 15,
  },
});

export default Player;
