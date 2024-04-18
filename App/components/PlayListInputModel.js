import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Color from "../misc/Color";
const PlayListInputModel = ({ visible, onClose, onSubmit }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ color: Color.ACTIVE_BG }}>Create new playlist</Text>
          <TextInput style={styles.input} />
          <AntDesign
            name="check"
            size={24}
            color={Color.ACTIVE_FONT}
            style={styles.submitIcon}
            onPress={onSubmit}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[StyleSheet.absoluteFillObject, styles.modalBg]} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const { width } = Dimensions.get("window");
export default PlayListInputModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: width - 20,
    height: 200,
    backgroundColor: Color.ACTIVE_FONT,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: width - 40,
    borderBottomWidth: 1,
    borderBottomColor: Color.ACTIVE_BG,
    fontSize: 18,
    paddingVertical: 5,
  },
  submitIcon: {
    padding: 10,
    backgroundColor: Color.ACTIVE_BG,
    borderRadius: 50,
    marginTop: 15,
  },
  modalBg: {
    backgroundColor: Color.MODAL_BG,
    zIndex: -1,
  },
});
