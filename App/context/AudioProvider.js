import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import React, { Component, createContext } from "react";
import { Alert } from "react-native";
import { DataProvider } from "recyclerlistview";
import { storeAudioForNextOpening } from "../misc/helper";
import { playNext } from "../misc/AudioController";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audiofiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      loading: false,
      playBack: null,
      soundObj: null,
      currentAudio: {},
      isPlaying: false,
      currentAudioIndex: null,
      playBackPosition: null,
      playBackDuration: null,
    };
    this.totalAudioCount = 0;
  }

  permissionAlert = () => {
    Alert.alert("Permission required", "This app needs to read audiofiles!", [
      {
        text: "I am ready",
        onPress: () => {
          this.getPermission();
        },
      },
      { text: "cancel", onPress: () => this.permissionAlert() },
    ]);
  };

  getAudioFiles = async () => {
    const { dataProvider, audiofiles } = this.state;

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    this.totalAudioCount = media.totalCount;
    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audiofiles,
        ...media.assets,
      ]),
      audiofiles: [...audiofiles, ...media.assets],
    });
  };

  // load prev audio
  loadPreviousAudio = async () => {
    let previousAudio = await AsyncStorage.getItem("previousAudio");
    let currentAudio;
    let currentAudioIndex;

    if (previousAudio === null) {
      currentAudio = this.state.audiofiles[0];
      currentAudioIndex = 0;
    } else {
      previousAudio = JSON.parse(previousAudio);
      currentAudio = previousAudio?.audio;
      currentAudioIndex = previousAudio?.index;
    }
    this.setState({ ...this.state, currentAudio, currentAudioIndex });
  };
  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      this.getAudioFiles();
      this.setState({ ...this.state, loading: true });
    }
    if (!permission.canAskAgain && !permission.granted) {
      this.setState({ ...this.state, permissionError: true });
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        this.permissionAlert();
      }
      if (status === "granted") {
        this.getAudioFiles();
      }
      if (status === "denied" && !canAskAgain) {
        this.setState({ ...this.state, permissionError: true });
      }
    }
  };

  onPlayBackStatus = async (playbackStatus) => {
    // console.log("playbackstatus", playbackStatus);
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      this.updateState(this, {
        playBackPosition: playbackStatus?.positionMillis,
        playBackDuration: playbackStatus?.durationMillis,
      });
    }
    // no next audio-> last
    if (playbackStatus.didJustFinish) {
      const nextAudioIndex = this.state.currentAudioIndex + 1;
      if (nextAudioIndex >= this.totalAudioCount) {
        this.state.playBack.unloadAsync();
        this.updateState(this, {
          soundObj: null,
          currentAudio: this.state.audiofiles[0],
          isPlaying: false,
          currentAudioIndex: 0,
          playBackPosition: null,
          playBackDuration: null,
        });
        return await storeAudioForNextOpening(this.state.audiofiles[0], 0);
      }
      const audio = this.state.audiofiles[nextAudioIndex];
      const status = await playNext(this.state.playBack, audio?.uri);
      this.updateState(this, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: nextAudioIndex,
      });

      await storeAudioForNextOpening(audio, nextAudioIndex);
    }
  };

  componentDidMount() {
    this.getPermission();
    this.setState({ ...this.state, loading: false });
    if (this.state.playBack === null) {
      this.setState({ ...this.state, playBack: new Audio.Sound() });
    }
  }

  updateState = (prevState, newState = {}) => {
    this.setState({ ...prevState, ...newState });
  };
  render() {
    const {
      audiofiles,
      dataProvider,
      permissionError,
      loading,
      playBack,
      soundObj,
      currentAudio,
      isPlaying,
      currentAudioIndex,
      playBackPosition,
      playBackDuration,
    } = this.state;
    if (permissionError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 25, textAlign: "center", color: "red" }}>
            It looks like you haven't accepted the permission
          </Text>
        </View>
      );
    }
    return (
      <AudioContext.Provider
        value={{
          audiofiles,
          dataProvider,
          loading,
          playBack,
          soundObj,
          currentAudio,
          isPlaying,
          currentAudioIndex,
          totalAudioCount: this.totalAudioCount,
          playBackPosition,
          playBackDuration,
          updateState: this.updateState,
          loadPreviousAudio: this.loadPreviousAudio,
          onPlayBackStatus: this.onPlayBackStatus,
        }}
      >
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
