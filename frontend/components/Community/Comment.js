import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalado @expo/vector-icons
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function Comment({ comment, is_mine }) {
  function formatDateTime(isoDate) {
    const date = new Date(isoDate);

    // Extraer partes de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const day = String(date.getDate()).padStart(2, "0");

    // Extraer partes de la hora
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Formatear en "YYYY-MM-DD HH:mm:ss"
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return (
    <View style={styles.commentContainer}>
      <View style={styles.header}>
        {/* Icono de flecha de respuesta */}
        <Ionicons
          name="return-down-forward-outline"
          size={25}
          color="#8B857E"
        />

        {/* Imagen de perfil */}
        <Image
          source={{
            uri: comment.profile_picture || "https://placekitten.com/50/50",
          }}
          style={styles.profileImage}
        />

        {/* Información del usuario */}
        <View style={styles.userInfo}>
          <TextCommonsMedium style={styles.userName}>
            {comment.name}
          </TextCommonsMedium>
          <TextCommonsRegular style={styles.userHandle}>
            @{comment.user}
          </TextCommonsRegular>
        </View>
      </View>

      {/* Contenido del comentario */}
      <TextCommonsRegular style={styles.commentText}>
        {comment.content}
      </TextCommonsRegular>

      <TextCommonsRegular style={styles.date}>
        {formatDateTime(comment.created_at)}
      </TextCommonsRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: "#ddd",
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  userHandle: {
    color: "#8B857E",
    fontSize: 12,
  },
  commentText: {
    marginTop: 5,
    marginLeft: 40,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  date: {
    color: "grey",
    fontSize: 10,
    marginTop: 15,
    marginLeft: 220,
  },
});
