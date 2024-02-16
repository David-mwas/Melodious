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
        <ActivityIndicator
          size={40}
          style={{ marginTop: 25 }}
          color={Color.ACTIVE_BG}
        />
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
