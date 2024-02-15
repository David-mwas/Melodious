import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./App/navigation/AppNavigator";
import AudioProvider from "./App/context/AudioProvider";

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>
  );
}
