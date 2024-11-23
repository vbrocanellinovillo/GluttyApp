import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tener @expo/vector-icons instalado
import LoadingGlutty from "../UI/Loading/LoadingGlutty";
import GluttyModal from "../UI/GluttyModal";
import { Colors } from "../../constants/colors";
import addComment from "../../services/communityService";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import UserImage from "../UI/UserImage/UserImage";

export default function AddComment({ id_post }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [commentAddedModal, setCommentAddedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [modalError, showModalError] = useState(false);
  const [comentarios, setComentarios] = useState([]); // Estado para manejar el array de comentarios

  const token = useSelector((state) => state.auth.accessToken);

  const handleSend = async () => {
    try {
      Keyboard.dismiss();
      console.log("Iniciando subida del comentario");
      setIsLoading(true);

      const nuevoComentario = await addComment(id_post, comment, token); // Publica el comentario
      setComentarios((prevComentarios) => [nuevoComentario, ...prevComentarios]); // Agrega el nuevo comentario al inicio del array
      setIsLoading(false);
      setCommentAddedModal(true);
      setComment("");
    } catch (error) {
      console.log(comment);
      console.error("Error al subir el comentario:", error);
      setIsLoading(false);
      setIsError(true);
      showModalError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      {/* Renderizar comentarios utilizando FlatList */}
      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()} // Usa un índice único si no hay un ID
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Comment comment={item} />
          </View>
        )}
      />

      <View style={styles.container}>
        {/* Cargando */}
        <LoadingGlutty visible={isLoading} />

        {/* Modal de error */}
        <GluttyModal
          visible={modalError}
          isError={isError}
          message={errorMessage}
          onClose={() => showModalError(false)}
        />

        {/* Modal de éxito */}
        <GluttyModal
          visible={commentAddedModal}
          message={"Comentario publicado!"}
          buttons={[
            {
              text: "Aceptar",
              bg: "green",
              color: Colors.whiteGreen,
              onPress: () => setCommentAddedModal(false),
            },
          ]}
        />

        <UserImage dimensions={40} />

        {/* Campo de texto */}
        <TextInput
          style={styles.input}
          placeholder="Nuevo comentario..."
          placeholderTextColor="#8B857E"
          value={comment}
          onChangeText={setComment}
          multiline={true} // Permite múltiples líneas
          textAlignVertical="top" // Alinea el texto al inicio verticalmente
        />

        {/* Botones */}
        <TouchableOpacity style={styles.emojiButton}>
          <Ionicons name="happy-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="arrow-forward" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECEBEA",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  commentContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 5,
    paddingVertical: 8,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: Colors.locro,
    borderRadius: 30,
    padding: 8,
    marginHorizontal: 5,
  },
  emojiButton: {
    padding: 8,
  },
});

