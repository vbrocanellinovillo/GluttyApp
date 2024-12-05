import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../constants/colors";
import PostCarousel from "./PostCarousel";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

const height = Dimensions.get("window").height;

export default function PoularPosts({ posts, onPress }) {
  const [width, setWidth] = useState(undefined);

  function findDimentions({ nativeEvent }) {
    setWidth(nativeEvent.layout.width);
  }

  return (
    <View style={styles.container}>
      {/* Título superior */}
      <TextCommonsMedium style={styles.title}>
        Tus publicaciones más likeadas
      </TextCommonsMedium>

      {/* Contenedor del post */}
      <View style={styles.postContainer} onLayout={findDimentions}>
        {width && (
          <PostCarousel
            posts={posts}
            onPress={onPress}
            height={height * 0.50}
            width={width}
          />
        )}
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
    borderRadius: 10,
    paddingVertical: 10,
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
