import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ActivityIndicator,
} from "react-native";
import Color from "../misc/Color";

const Screen = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <View style={styles.container}>{children}</View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.APP_BG,
    // expo contants api to support both android and ios
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
