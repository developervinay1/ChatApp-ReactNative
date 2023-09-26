import { StatusBar } from "expo-status-bar";
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StackNavigator from "./StackNavigator";

export default function App() {
  const { StatusBarManager } = NativeModules;
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
        flex: 1,
      }}
    >
      <StackNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
