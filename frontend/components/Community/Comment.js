import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener instalado @expo/vector-icons
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { useState } from "react";
import GluttyModal from "../UI/GluttyModal";
import { ErrorMessage } from "formik";
import { Colors } from "../../constants/colors";
import { deleteComment } from "../../services/communityService";

export default function Comment({ comment, is_mine, token, onDelete }) {
  const [visible, setIsVisible] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [error, setIsError] = useState(false);
  const [errorMessage, setMessage] = useState(false);
  const [modalExito, setModalExito] = useState(false);

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

  async function handleConfirmDelete(id) {
    try {
      //setIsLoading(true);
      const response = await deleteComment(id, token);
      setMessage("El post fue eliminado con éxito");
      setModalExito(true);
      onDelete && onDelete(id);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setModalExito(true);
      console.log(error.message);
    } finally {
      //setIsLoading(false);
    }
    setShowEliminarModal(false);
  }

  function closeModalDeleteHandler(){
    setShowEliminarModal(false)
  }

  function closeModalHandler() {
    setModalExito(false);
  }

  console.log("comentario", comment);
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

      {/* Icono de tacho de basura si el comentario es del usuario */}
      {is_mine && (
        <TouchableOpacity
          style={styles.trashIcon}
          onPress={() => {
            // Llama al Glutty Modal
            setShowEliminarModal(true);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#ff3333" />
        </TouchableOpacity>
      )}
      <GluttyModal
        visible={showEliminarModal}
        onClose={closeModalDeleteHandler}
        message="¿Seguro que desea eliminar el comentario?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: () => handleConfirmDelete(comment.comment_id)
          },
        ]}
        closeButtonText="Cancelar"
      />
      <GluttyModal
        isError={error}
        message={errorMessage}
        onClose={closeModalHandler}
        visible={modalExito}
      />
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
  trashIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 1, // Asegura que esté sobre otros elementos
  },
});
