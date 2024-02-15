import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
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
          <Text style={styles.title} numberOfLines={2}>
            {filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableWithoutFeedback onPress={onPlayPress}>
              <Text style={styles.option}>play</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={onPlayListPress}>
              <Text style={styles.option}>Add to playList</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          {" "}
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
    backgroundColor: Color.APP_BG,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: Color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: Color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
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
