//Aca poner lógica de popular post
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import PostItem from "../Community/PostItem";
import PostCarousel from "./PostCarousel";


export default function LikedPost({ post, onPress }) {
  return (
    <View style={styles.container}>
      {/* Título superior */}
      <Text style={styles.title}>Tus publicaciones más likeada</Text>
      
      {/* Contenedor del post */}
      <PostCarousel posts={post} onPress={onPress}></PostCarousel>
      {/* Slider / Footer */}
      <View style={styles.sliderContainer}>
        <View style={styles.slider}>
          <View style={styles.sliderThumb} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFAF60",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#463333",
    marginBottom: 12,
  },
  postContainer: {
    backgroundColor: "#E7E7E7",
    padding: 16,
    borderRadius: 10,
  },
  sliderContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  slider: {
    width: "80%",
    height: 6,
    backgroundColor: Colors.sliderBackground,
    borderRadius: 3,
    position: "relative",
  },
  sliderThumb: {
    width: 20,
    height: 6,
    backgroundColor: Colors.sliderActive,
    borderRadius: 3,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -10 }],
  },
});
