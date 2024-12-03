import { useCallback, useState } from "react";
import { getPostById } from "../../services/communityService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import AddComment from "../../components/Community/AddComment";
import PostItem from "../../components/Community/PostItem";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Comment from "../../components/Community/Comment";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../../components/UI/FontsTexts/TextCommonsRegular";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { deletePost } from "../../services/communityService";
import GluttyModal from "../../components/UI/GluttyModal";
import ConsultarPostSkeleton from "../../components/UI/Loading/ConsultarPostSkeleton";


export default function ViewPostById({ route, navigation }) {
  const [post, setPost] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setIsError] = useState(false);

  //Const de modal
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);

  const id = route.params?.id;
  const token = useSelector((state) => state.auth.accessToken);
  const username = useSelector((state) => state.auth.userData.username);

  let is_mine = false;

  function closeModalHandler() {
    setShowModal(false);
    navigation.navigate("MyPosts", { refresh: true });
  }

  async function confirmModalDeleteHandler() {
    try {
      setIsLoading(true);
      const response = await deletePost(id, token);
      setMessage("El post fue eliminado con éxito");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setShowModal(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    setShowEliminarModal(false);
  }

  function closeModalDeleteHandler(){
    setShowEliminarModal(false)
  }

  useFocusEffect(
    useCallback(() => {
      const cargarPost = async () => {
        setIsLoading(true);
        try {
          const selectedPost = await getPostById(id, token);
          setIsLoading(false);
          setPost(selectedPost);
          //console.log("el posteo lindo:     ", selectedPost);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      cargarPost();
    }, [id, token])
  );

  // Confirmación de la eliminación
  async function handleConfirmDelete() {
    setShowEliminarModal(true);
  }

if (isLoading) {
      return <ConsultarPostSkeleton />;
  }

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      {/*ES EL DE CONFIRMAR ALGO*/}
      <GluttyModal
        visible={showEliminarModal}
        onClose={closeModalDeleteHandler}
        message="¿Seguro que desea eliminar el estudio?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: confirmModalDeleteHandler
          },
        ]}
        closeButtonText="Cancelar"
      />
      <ScrollView style={styles.scroll}>
        {/* Mostrar el post */}
        <PostItem
          post={post}
          iconPost="trash-outline"
          onPressIcon={handleConfirmDelete}
        />

        {/* Mostrar los comentarios */}
        {post?.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            is_mine = comment.user === username,
            <Comment key={index} comment={comment} is_mine={is_mine} token={token} />
          ))
        ) : (
          <TextCommonsRegular style={styles.noComments}>    
          </TextCommonsRegular>
        )}

        {/* Agregar un nuevo comentario */}
        <AddComment id_post={id} />
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  noComments: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.mJordan,
  },
  scroll: {
    marginBottom: 100,
  }
});
