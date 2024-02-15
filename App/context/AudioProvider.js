import * as MediaLibrary from "expo-media-library";
import React, { Component, createContext } from "react";
import { Alert } from "react-native";
import { DataProvider } from "recyclerlistview";

export const AudioContext = createContext();

export class AudioProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audiofiles: [],
      permissionError: false,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2),
      loading: false,
    };
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
    this.setState({ ...this.state, loading: true });
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    this.setState({
      ...this.state,
      dataProvider: dataProvider.cloneWithRows([
        ...audiofiles,
        ...media.assets,
      ]),
      audiofiles: [...audiofiles, ...media.assets],
    });
  };
  getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      this.getAudioFiles();
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
  componentDidMount() {
    this.getPermission();
    this.setState({ ...this.state, loading: false });
  }
  render() {
    const { audiofiles, dataProvider, permissionError, loading } = this.state;
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
      <AudioContext.Provider value={{ audiofiles, dataProvider, loading }}>
        {this.props.children}
      </AudioContext.Provider>
    );
  }
}

export default AudioProvider;
