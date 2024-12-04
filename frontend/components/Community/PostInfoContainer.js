import { StyleSheet, View } from "react-native";
import PostInfo from "./PostInfo";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { addFavorite, addLike } from "../../services/communityService";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function PostInfoContainer({
  likes,
  comments,
  faved,
  liked,
  id,
  style,
  onPressIcon,
}) {
  const [isFaved, setFaved] = useState(faved);
  const [isLiked, setLiked] = useState(liked);
  const [sumLiked, setSumLiked] = useState(likes);

  const token = useSelector((state) => state.auth.accessToken);
  const navigation = useNavigation();

  async function handleLike() {
    try {
      setLiked(!isLiked);
      onPressIcon("heart", Colors.redLike);
      await addLike(id, token);
      if (isLiked) {
        setSumLiked(sumLiked - 1);
      } else {
        setSumLiked(sumLiked + 1);
      }
    } catch (error) {
      setLiked(!isLiked);
    }
  }

  async function handleFav() {
    try {
      setFaved(!isFaved);
      onPressIcon("star", Colors.favYellow);
      const response = addFavorite(id, token);
    } catch (error) {
      setFaved(!isFaved);
    }
  }

  function handleComment() {
    navigation.navigate("ViewPostById", {id});
  }

  return (
    <Animated.View style={[styles.container, style]}>
      <PostInfo icon="chatbubble-ellipses" number={comments} onPress={handleComment} />
      <PostInfo
        icon={isLiked ? "heart" : "heart-outline"}
        iconColor={isLiked && Colors.redLike}
        number={sumLiked}
        onPress={handleLike}
      />
      <PostInfo
        icon={isFaved ? "star" : "star-outline"}
        iconColor={isFaved && Colors.favYellow}
        onPress={handleFav}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
});
