import { StyleSheet, View } from "react-native";
import PostInfo from "./PostInfo";
import { Colors } from "../../constants/colors";
import { useState } from "react";

export default function PostInfoContainer({ likes, comments, faved, liked }) {
  const [isFaved, setFaved] = useState(faved);
  const [isLiked, setLiked] = useState(liked);

  async function handleLike() {
    try {
      setLiked(!isLiked);
      // Aca va la conexión con el back
    } catch (error) {
      setLiked(!isLiked);
    }
  }

  async function handleFav() {
    try {
      setFaved(!isFaved);
      // Aca va la conexión con el back
    } catch (error) {
      setFaved(!isFaved);
    }
  }

  return (
    <View style={styles.container}>
      <PostInfo icon="chatbubble-ellipses" number={comments} />
      <PostInfo
        icon={isLiked ? "heart" : "heart-outline"}
        iconColor={isLiked && Colors.redLike}
        number={likes}
        onPress={handleLike}
      />
      <PostInfo
        icon={isFaved ? "star" : "star-outline"}
        iconColor={isFaved && "#ffbb00"}
        onPress={handleFav}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
});
