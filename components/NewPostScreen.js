import {
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  getAuth,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  collection,
  serverTimestamp,
} from "../firebase";
import { useNavigation } from "@react-navigation/native";

const NewPostScreen = ({ route }) => {
  const { pickerResult } = route.params;

  const [profile, setProfile] = useState(null);
  const [caption, setCaption] = useState("");

  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  useEffect(() => getProfile(), []);

  const getProfile = async () => {
    const userDocRef = doc(db, `users/${auth.currentUser.email}`);
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();

    setProfile({
      username: data.username,
      pic: data.pic,
      uid: data.uid,
      email: data.email,
    });
  };

  const addPost = async () => {
    await addDoc(collection(db, "posts"), {
      username: profile.username,
      pfPic: profile.pic,
      uid: profile.uid,
      email: profile.email,
      image: pickerResult.uri,
      caption,
      timestamp: serverTimestamp(),
    });
    navigation.goBack("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Selected Image</Text>
      <View
      // style={styles.picContainer}
      >
        <Image
          style={styles.picture}
          source={{
            uri: pickerResult.uri,
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Caption"
          value={caption}
          onChangeText={(text) => setCaption(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addPost} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    padding: 15,
  },
  picture: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputContainer: {
    width: "90%",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
