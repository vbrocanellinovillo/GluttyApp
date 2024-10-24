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


  function closeModalHandler() {
    setShowModal(false);
    navigation.goBack();
  }

  function closeModalDeleteHandler() {
    setShowEliminarModal(false);
  }



  useFocusEffect(
    useCallback(() => {
      const cargarPost = async () => {
        setIsLoading(true);
        try {
          const selectedPost = await getPostById(id, token);
          setIsLoading(false);
          console.log("posteo consulta:", selectedPost);
          setPost(selectedPost);
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
    try {
      setIsLoading(true);
      const response = await deletePost(id, token);
      setMessage("El post fue eliminado con éxito");
      setShowEliminarModal(false);
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setShowModal(true);
      console.log(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <LoadingGlutty visible={isLoading} />
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
          },
        ]}
        closeButtonText="Cancelar"
      />
          <ScrollView contentContainerStyle={{ padding: 13, paddingBottom: 150 }}>
        {/* Mostrar el post */}
        <PostItem post={post} iconPost="trash-outline" onPressIcon={handleConfirmDelete}/>

        {/* Mostrar los comentarios */}
        {post?.comments?.length > 0 ? (
          post.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        ) : (
          <TextCommonsRegular style={styles.noComments}>
            No hay comentarios aún.
          </TextCommonsRegular>
        )}

        {/* Agregar un nuevo comentario */}
        <AddComment id_post={id} />
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create(
  {
  noComments: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
    fontSize: 16,
    color: Colors.mJordan,

 }
});