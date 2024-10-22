import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import Tag from "./TagItem";
import PostInfoContainer from "./PostInfoContainer";
import { Divider } from "react-native-paper";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";
import UserImage from "../UI/UserImage/UserImage";
import { Ionicons } from "@expo/vector-icons";
import TagItem from "./TagItem";
import { useState } from "react";
import { deletePost } from "../../services/communityService";
import { useSelector } from "react-redux";
import GluttyModal from "../UI/GluttyModal";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({
  post,
  containerStyle,
  curved,
  curvedStyle,
  onPress,
  iconPost = "chevron-forward-outline",
  onPressIcon,
}) {
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);



  function handlePress() {
    Haptics.selectionAsync();
    if (iconPost != "chevron-forward-outline") {
      console.log("Eliminar")
      console.log("DICE DELFI QUE LE PONGA ALGO ANTES: ", onPressIcon)
      onPressIcon && onPressIcon();
    } else {
      onPress && onPress();
    }
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
          <View style={styles.userData}>
            <UserImage dimensions={40} source={post?.userImage} />
            <TextCommonsMedium style={styles.name}>
              {post?.name}
            </TextCommonsMedium>
            <TextCommonsRegular style={styles.username}>
              @{post?.username || post?.user}
            </TextCommonsRegular>
          </View>
          <Pressable onPress={handlePress}>
            <Ionicons style={styles.verMas} name={iconPost} />
          </Pressable>
        </View>
        <TextCommonsRegular style={styles.content}>
          {post?.content || post?.body}
        </TextCommonsRegular>
        <View style={styles.tagsContainer}>
          {post?.tags && post.tags.length > 0 ? (
            post?.tags.map((tag, index) => <TagItem key={index}>{tag}</TagItem>)
          ) : (
            <TextCommonsMedium style={styles.noTagsText}>
              No hay etiquetas disponibles.
            </TextCommonsMedium>
          )}
        </View>
        <View style={styles.infoContainer}>
          <TextCommonsRegular style={styles.date}>
            {post?.date ? post?.date : "Fecha no disponible"}
          </TextCommonsRegular>

          <PostInfoContainer
            comments={post?.comments_number}
            likes={post?.likes}
            faved={post?.faved}
            liked={post?.liked}
            id={post?.id}
          />
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
    justifyContent: "space-between",
  },

  userData: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },

  noTagsText: {
    color: "grey",
  },

  verMas: {
    fontSize: 20,
  },
});
