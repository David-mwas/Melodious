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

export default class AudioList extends Component {
  static contextType = AudioContext;

  constructor(props) {
    super(props);
    this.state = {
      optionModalViscible: false,
      playBack: null,
      soundObj: null,
      currentAudio: {},
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
    console.log(audio.id);
    // playing audio for 1st time
    if (this.state.soundObj === null) {
      const playBack = new Audio.Sound();
      const status = await playBack.loadAsync(
        { uri: audio.uri },
        { shouldPlay: true }
      );
      return this.setState({
        ...this.state,
        currentAudio: audio,
        playBack: playBack,
        soundObj: status,
      });
    }
    // pause audio
    if (this.state.soundObj.isLoaded && this.state.soundObj.isPlaying) {
      const status = await this.state.playBack.setStatusAsync({
        shouldPlay: false,
      });
      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }

    // resume audio
    if (
      this.state.soundObj.isLoaded &&
      !this.state.soundObj.isPlaying &&
      this.state.currentAudio === audio.id
    ) {
      const status = await this.state.playBack.playAsync();
      return this.setState({
        ...this.state,
        soundObj: status,
      });
    }
  };

  rowRenderer = (type, item) => {
    // console.log(item);
    return (
      <AudioListItem
        title={item.filename}
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
        {({ dataProvider, loading }) => {
          console.log(loading);
          return (
            <Screen style={{ flex: 1 }}>
              {loading ? (
                <>
                  <RecyclerListView
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
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
