import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import Color from "../misc/Color";

const Screen = ({ children, loading }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.APP_BG,
    // expo constants api to support both android and ios
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
