import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import Color from "../misc/Color";

const OptionModel = ({
  visible,
  onClose,
  currentItem,
  onPlayPress,
  onPlayListPress,
}) => {
  const { filename } = currentItem;
  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={1}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onPlayListPress}>
              <Text style={styles.option}>Add To TlayList</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modelBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: "23%",
    backgroundColor: Color.ACTIVE_BG,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 20,
    zIndex: 1000,
  },
  optionContainer: {
    marginTop: 40,
    flexDirection: "row",
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: Color.APP_BG,
  },
  option: {
    fontSize: 18,
    fontWeight: "bold",
    color: Color.APP_BG,
    paddingVertical: 10,
    letterSpacing: 1,
    backgroundColor: "violet",
    paddingHorizontal: 5,
    height: 40,
    width: "45%",
    textAlign: "center",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  modelBg: {
    position: "absolute",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: Color.MODAL_BG,
  },
});

export default OptionModel;
