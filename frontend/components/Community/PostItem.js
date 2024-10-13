import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import Tag from "./Tag";
import PostInfoContainer from "./PostInfoContainer";
import { Divider } from "react-native-paper";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";
import UserImage from "../UI/UserImage/UserImage";

export default function PostItem({
  post,
  containerStyle,
  curved,
  curvedStyle,
  onPress,
}) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress();
  }

  return (
    <>
      <Pressable
        style={[
          styles.container,
          containerStyle,
          curved && styles.curved,
          curved && curvedStyle,
        ]}
        onPress={handlePress}
      >
        <View style={styles.nameContainer}>
          <UserImage dimensions={40} source={post.userImage} />
          <TextCommonsMedium style={styles.name}>
            {post?.name}
          </TextCommonsMedium>
          <TextCommonsRegular style={styles.username}>
            @{post?.username}
          </TextCommonsRegular>
        </View>
        <TextCommonsRegular style={styles.content}>
          {post?.content}
        </TextCommonsRegular>
        <View style={styles.tagsContainer}>
          {post?.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </View>
        <View style={styles.infoContainer}>
          <TextCommonsRegular style={styles.date}>
            {post?.date}
          </TextCommonsRegular>
          <PostInfoContainer comments={post?.comments} likes={post?.likes} />
        </View>
      </Pressable>
      {!curved && <Divider />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  curved: {
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.mJordan,
  },

  username: {
    fontSize: 14,
    color: Colors.mJordan,
    fontWeight: "400",
  },

  content: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.mJordan,
    marginTop: 6,
  },

  date: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.mJordan,
  },
});
