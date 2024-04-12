import React, { useContext } from "react";
import { View, StyleSheet, Text, Dimensions, StatusBar } from "react-native";
import Screen from "../components/Screen";
import Color from "../misc/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import PlayerButton from "../components/PlayerButton";
import { AudioContext } from "../context/AudioProvider";
const { width } = Dimensions.get("window");

const Player = () => {
  const context = useContext(AudioContext);
  const { playBackPosition, playBackDuration } = context;
  const calcSeekBar = () => {
    if (playBackPosition !== null && playBackDuration !== null) {
      return playBackPosition / playBackDuration;
    }
    return 0;
  };
  console.log(playBackPosition, playBackDuration);
  return (
    <Screen>
      <StatusBar hidden={false}  backgroundColor={Color.ACTIVE_BG}/>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1}/${
          context.totalAudioCount
        } songs`}</Text>
        <View style={styles.midBannerContainer}>
          <MaterialCommunityIcons
            name="music-circle"
            size={320}
            color={context.isPlaying ? Color.ACTIVE_BG : Color.FONT_MEDIUM}
          />
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text style={styles.audioTitle} numberOfLines={1}>
            {context.currentAudio.filename}
          </Text>
          <Slider
            value={calcSeekBar()}
            style={{ width: width, height: 40 }}
            maximumValue={1}
            minimumValue={0}
            minimumTrackTintColor={Color.FONT_MEDIUM}
            maximumTrackTintColor={Color.ACTIVE_BG}
          />
          <View style={styles.audioControllers}>
            <PlayerButton
              iconType={"PREV"}
              onPress={() => {
                console.log("prev");
              }}
            />
            <PlayerButton
              size={50}
              style={{ marginHorizontal: 25 }}
              iconType={context.isPlaying ? "PLAY" : "PAUSE"}
            />
            <PlayerButton iconType={"NEXT"} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  audioCount: {
    textAlign: "right",
    padding: 15,
    color: Color.FONT_MEDIUM,
    fontSize: 19,
    fontWeight: "600",
    fontFamily: "monospace",
  },
  midBannerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  audioTitle: {
    fontSize: 16,
    color: Color.FONT,
    padding: 15,
  },
  audioControllers: {
    width: width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default Player;
