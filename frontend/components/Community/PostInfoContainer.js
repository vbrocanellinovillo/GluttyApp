import { StyleSheet, View } from "react-native";
import PostInfo from "./PostInfo";

export default function PostInfoContainer({ likes, comments }) {
  return (
    <View style={styles.container}>
      <PostInfo icon="chatbubble-ellipses" number={comments} />
      <PostInfo icon="heart" number={likes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
});
