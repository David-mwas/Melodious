import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import Color from "../misc/Color";

const getThumbnailText = (filename) => {
  let name = filename[0];
  if (filename.slice(0, 8) == "yt1s.com") {
    name = filename[11];
  }
  if (filename.slice(0, 7) == "yt1scom") {
    name = filename[7];
  }
  if (filename.slice(0, 13) == "[YT2mp3.info]") {
    name = filename[16];
  }
  return name;
};
const converTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }
    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }
    if (sec < 10) {
      return `${minute}:0${sec}`;
    }
    return `${minute}:${sec}`;
  }
};
const AudioListItem = ({ title, duration, onPressOptions, onAudioPress }) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>
                {getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.timeText}>{converTime(duration)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View styles={styles.rightContainer}>
          <Entypo
            onPress={onPressOptions}
            name="dots-three-vertical"
            size={20}
            color={Color.FONT_MEDIUM}
            style={{ padding: 10 }}
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
    fontWeight: "600",
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
    height: 1.3,
    alignSelf: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: Color.FONT_MEDIUM,
  },
});

export default AudioListItem;
