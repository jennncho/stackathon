import React, { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
//import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import NewPostScreen from "./components/NewPostScreen";
import LoginScreen from "./components/LoginScreen";
import SignUpScreen from "./components/SignUpScreen";
import ProfileScreen from "./components/ProfileScreen";
import BottomTab from "./components/BottomTab";

const Stack = createNativeStackNavigator();
const screenOption = {
  headerShown: false,
};
const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOption}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOption}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{ title: "New Post" }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
    <BottomTab />
  </NavigationContainer>
);

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => onAuthStateChanged(auth, (user) => userHandler(user)), []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
