import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth, signOut } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

const Header = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      console.log("Signed out sucessfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }
    if (pickerResult !== null) {
      navigation.push("NewPostScreen", { pickerResult });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Text
            styles={styles.logoText}
            style={{ fontSize: 25, fontFamily: "Optima" }}
          >
            Vzualize
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Icon
            size={34}
            color="grey"
            name="add-circle-outline"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutUser}>
          <Icon
            size={35}
            color="grey"
            name="log-out-outline"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
    //backgroundColor: "pink",
    padding: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 8,
    marginBottom: 5,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 87,
  },
});
