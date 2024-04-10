import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Color from "../misc/Color";
const PlayerButton = (props) => {
  const { iconType, size = 30, color = Color.FONT, onPress } = props;
  const getIconName = (type) => {
    switch (type) {
      case "PLAY":
        return "pausecircle";
      case "PAUSE":
        return "playcircleo";
      case "NEXT":
        return "forward";
      case "PREV":
        return "banckward";
    }
  };
  return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={color}
    />
  );
};

export default PlayerButton;
