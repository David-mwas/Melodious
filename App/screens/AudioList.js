import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { Component } from "react";
import { AudioContext } from "../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem";
import Screen from "../components/Screen";
import OptionModel from "../components/OptionModel";
import Color from "../misc/Color";
import { Audio } from "expo-av";
import { pause, play, playNext, resume } from "../misc/AudioController";

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalViscible: false,
    };
    this.currentItem = {};
  }

  // Define layoutProvider as a method within the class
  layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      switch (type) {
        case "audio":
          dim.width = Dimensions.get("window").width;
          dim.height = 70;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  handleAudioPress = async (audio) => {
    const { soundObj, playBack, currentAudio, updateState, audiofiles } =
      this.context;
    // playing audio for 1st time
    if (soundObj === null) {
      const playBack = new Audio.Sound();
      const status = await play(playBack, audio.uri);
      const index = audiofiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        playBack: playBack,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }

    // pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playBack);
      const index = audiofiles.indexOf(audio);
      return updateState(this.context, {
        soundObj: status,
        isPlaying: false,
        currentAudioIndex: index,
      });
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playBack);
      const index = audiofiles.indexOf(audio);
      return updateState(this.context, {
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playBack, audio.uri);
      const index = audiofiles.indexOf(audio);
      return updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
      });
    }
  };

  rowRenderer = (type, item, index, extendedState) => {
    // console.log(item);
    return (
      <AudioListItem
        title={item.filename}
        isPlaying={extendedState.isPlaying}
        activeListItem={this.context.currentAudioIndex === index}
        duration={item.duration}
        onAudioPress={() => {
          this.handleAudioPress(item);
        }}
        onPressOptions={() => {
          this.currentItem = item;
          this.setState({ ...this.state, optionModalViscible: true });
        }}
      />
    );
  };

  render() {
    return (
      <AudioContext.Consumer>
        {({ dataProvider, loading, isPlaying }) => {
          console.log(isPlaying);
          return (
            <Screen style={{ flex: 1 }}>
              {loading ? (
                <>
                  <RecyclerListView
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                    extendedState={{ isPlaying }}
                  />
                  <OptionModel
                    currentItem={this.currentItem}
                    onPlayListPress={() => {}}
                    onPlayPress={() => {}}
                    visible={this.state.optionModalViscible}
                    onClose={() => {
                      this.setState({
                        ...this.state,
                        optionModalViscible: false,
                      });
                    }}
                  />
                </>
              ) : (
                <ActivityIndicator
                  size={40}
                  style={{ marginTop: 25 }}
                  color={Color.ACTIVE_BG}
                />
              )}
            </Screen>
          );
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
