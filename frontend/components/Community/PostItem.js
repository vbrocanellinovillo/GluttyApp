import { Pressable, StyleSheet, View, Text } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import Tag from "./Tag";
import PostInfoContainer from "./PostInfoContainer";
import { Divider } from "react-native-paper";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";
import UserImage from "../UI/UserImage/UserImage";
import { Ionicons } from "@expo/vector-icons";

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

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
  
    const formattedDate = date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }); // Ejemplo: "19/10/2024"
  
    const formattedTime = date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Formato de 24 horas
    }); // Ejemplo: "22:20"
  
    return `${formattedDate} ${formattedTime}`;
  };

  console.log("labels: " + post.labels)

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
          <UserImage dimensions={40} source={post.profile_picture} />
          <TextCommonsMedium style={styles.name}>
            {post?.name}
          </TextCommonsMedium>
          <TextCommonsRegular style={styles.username}>
            @{post?.user}
          </TextCommonsRegular>
          <Ionicons style={styles.verMas}name="chevron-forward-outline"></Ionicons>
        </View>
        <TextCommonsRegular style={styles.content}>
          {post?.body}
        </TextCommonsRegular>
        <View style={styles.tagsContainer}>
        {post?.labels && post.labels.length > 0 ? (
          post.labels.map((tag, index) => <Tag key={index}>{tag}</Tag>)
        ) : (
          <Text style={styles.noTagsText}>No hay etiquetas disponibles.</Text>
        )}
      </View>
        <View style={styles.infoContainer}>
          <TextCommonsRegular style={styles.date}>
            {post?.created_at ? formatDateTime(post.created_at) : 'Fecha no disponible'}
          </TextCommonsRegular>

          <PostInfoContainer comments={post?.comments_number} likes={post?.likes} />
        
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
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
  },
  noTagsText: {

  },
  verMas: {
    marginLeft: 100,
    fontSize: 20,
  }
});
