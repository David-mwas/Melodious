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

  rowRenderer = (type, item) => {
    // console.log(item);
    return (
      <AudioListItem
        title={item.filename}
        duration={item.duration}
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
