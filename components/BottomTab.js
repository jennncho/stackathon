import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import NewPostScreen from "./NewPostScreen";
import Icon from "react-native-vector-icons/Ionicons";

const BottomTab = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          {/* <Text style={styles.buttonText}>Home</Text> */}
          <Icon size={35} color="white" name="home-outline" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {/* <Text style={styles.buttonText}>Profile</Text> */}
          <Icon size={35} color="white" name="person-outline" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingTop: 20,
    backgroundColor: "#E7D2CC",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },
  buttonText: {
    fontSize: 20,
  },
});
