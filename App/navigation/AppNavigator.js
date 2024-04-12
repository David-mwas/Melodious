import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AudioList from "../screens/AudioList";
import Player from "../screens/Player";
import PlayList from "../screens/PlayList";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Color from "../misc/Color";
import { View, Text } from "react-native";

const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="headset" size={size} color={color} />;
          },
          tabBarActiveTintColor: Color.ACTIVE_BG,
          headerTintColor: Color.ACTIVE_BG,
        
        }}
      />
      <Tab.Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="compact-disc" size={size} color={color} />
            );
          },
          tabBarActiveTintColor: Color.ACTIVE_BG,
        }}
      />
      <Tab.Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="library-music" size={size} color={color} />
            );
          },
          tabBarActiveTintColor: Color.ACTIVE_BG,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
