import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./App/navigation/AppNavigator";
import AudioProvider from "./App/context/AudioProvider";
import Color from "./App/misc/Color";
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.APP_BG,
  },
};
export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer theme={myTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>
  );
}
