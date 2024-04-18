import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Color from "../misc/Color";
import PlayListInputModel from "../components/PlayListInputModel";

const PlayList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.playListBanner}>
        <Text>My favorite</Text>
        <Text style={styles.audioCount}>0 songs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 15 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.playListButton}>+ Add New PlayList</Text>
      </TouchableOpacity>
      <PlayListInputModel
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  playListBanner: {
    padding: 5,
    backgroundColor: "rgba(204,204,204,.3)",
    borderRadius: 5,
  },
  audioCount: {
    marginTop: 3,
    opacity: 0.5,
    fontSize: 14,
  },
  playListButton: {
    color: Color.ACTIVE_BG,
    letterSpacing: 1,
    fontWeight: "bold",
    fontSize: 14,
    padding: 5,
  },
});

export default PlayList;
