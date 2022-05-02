import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import Header from "./Header";
import { collection, getFirestore, getDocs, orderBy } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { query } from "firebase/firestore";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const db = getFirestore();
  const navigation = useNavigation();

  const getPosts = async () => {
    const posts = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const snapshot = await getDocs(posts);
    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getPosts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView styles={styles.container}>
      <Header />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
});
