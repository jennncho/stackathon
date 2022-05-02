import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import SignUpScreen from "./components/SignUpScreen";
import AuthNavigation from "./AuthNavigation";
const Stack = createNativeStackNavigator();

export default function App() {
  return <AuthNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
