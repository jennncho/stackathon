import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import {
  getAuth,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  orderBy,
} from "../firebase";
import { query, where, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Post from "./Post";

const ProfileScreen = () => {
  const [profile, setProfile] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

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

  const getUserPosts = async () => {
    const posts = query(
      collection(db, "posts"),
      where("uid", "==", `${auth.currentUser.uid}`)
    );
    const snapshot = await getDocs(posts);
    setUserPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProfile();
      getUserPosts();
    });
    return unsubscribe;
  }, [navigation]);

  console.log("PROFILE", profile);
  return (
    <SafeAreaView styles={styles.container}>
      <Header />
      <View style={styles.picContainer}>
        <Image source={{ uri: profile.pic }} style={styles.story} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{profile.username}</Text>
      </View>
      <ScrollView>
        <Text style={styles.text}>
          _______________________________________________________
        </Text>
        {/* <View>
          {userPosts.map((post, index) => (

          ))}
        </View> */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {userPosts.map((post, index) => {
            return Photo(post, index);
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Photo = (post, index) => {
  return (
    <View key={index} style={styles.grid}>
      <Image
        style={styles.postImage}
        resizeMode="contain"
        source={{ uri: post.image }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
  },
  picContainer: {
    flexDirection: "row",
  },
  nameContainer: {
    justifyContent: "center",
    // alignItems: "center",
    marginLeft: 44,
    marginTop: 10,
  },
  name: {
    fontSize: 18,
  },
  text: {
    paddingTop: 8,
  },
  story: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
    marginLeft: 20,
    borderWidth: 1.5,
    borderColor: "grey",
    flexDirection: "row",
  },
  grid: {
    marginTop: 12,
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "yellow",
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    marginRight: 10,
    marginLeft: 25,
    paddingBottom: 8,
    borderRadius: 8,
  },
  postImage: {
    width: 230,
    alignSelf: "center",
    height: 130,
  },
});
