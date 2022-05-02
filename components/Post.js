import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  getAuth,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  collection,
} from "../firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostImage post={post} />
        <PostFooter />
        <PostCaption post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: post.pfPic }} style={styles.story} />
        <Text style={styles.userName}>{post.username}</Text>
      </View>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: "100%", height: 450 }}>
      <Image
        source={{ uri: post.image }}
        style={{ height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

const PostFooter = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
      }}
    >
      <View style={styles.leftFooterIconContainer}>
        <TouchableOpacity onPress={() => setClicked(!clicked)}>
          <Icon
            style={styles.footerIcon}
            size={30}
            color="black"
            name={clicked === false ? "heart-outline" : "heart-sharp"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostCaption = ({ post }) => (
  <View style={{ marginTop: 5, marginLeft: 5 }}>
    <Text style={{ color: "black", fontSize: 17 }}>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

export default Post;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  story: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "grey",
  },
  userName: {
    color: "black",
    marginLeft: 5,
    fontSize: 17,
  },
  footerIcon: {
    height: 33,
    width: 33,
  },
  leftFooterIconContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});
