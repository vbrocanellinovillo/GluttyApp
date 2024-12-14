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
import { banPost, report, resolvePost } from "../../services/adminService";


export default function ViewPostById({ route, navigation }) {
  const [post, setPost] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setIsError] = useState(false);

  //Const de modal
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false)
  const [banpostdata, setbanpostdata] = useState(undefined)
  const [resolvepostdata, setresolvepostdata] = useState(undefined)

  const [reportData, setReportData] = useState({ type: null, id: null });
  const [showModalReportClose, setShowModalReportClose] = useState(false);
  const [showBanModal, setShowBanModal] = useState(false)
  const [showModalResolveClose, setShowModalResolveClose] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false)


  
  const admin = route.params?.admin || false


  const id = route.params?.id;
  const token = useSelector((state) => state.auth.accessToken);
  const username = useSelector((state) => state.auth.userData.username);
  const is_admin = useSelector((state) => state.auth.isAdmin);
  const is_reportable = route.paramas?.isReportable || true

  let is_mine = false;

  function closeModalHandler() {
    setShowModal(false);
    navigation.navigate("MyPosts", { refresh: true });
  }

  function closeModalHandlerReport() {
    setShowModal(false);
    navigation.goBack();
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
          console.log("el posteo lindo:     ", selectedPost);
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

  function handleDeleteComment(commentId) {
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.filter((comment) => comment.comment_id !== commentId),
    }));
  }

  function handleReport(reportType, reportId){
    setReportData({ type: reportType, id: reportId });
    setShowReportModal(true)
  }
  async function confirmModalReportHandler() {
    try {
      setIsLoading(true);
      const response = await report(reportData.type, reportData.id, token);
      setMessage("Tu reporte fue registrado con exito");
      setShowModalReportClose(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setShowModal(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    setShowReportModal(false);
  }
  function closeModalReportHandler(){
    setShowReportModal(false)
    setShowBanModal(false)
    setShowResolveModal(false)
  }

  //manejo del ok del post 

  async function handleResolvePost(post_id){
    console.log(post_id)
    setresolvepostdata(post_id)
    setShowResolveModal(true)

  }


  // Manejo del baneo

  //Comienzo de resolve post
  async function handleBanPost(post_id){
    setbanpostdata(post_id)
    setShowBanModal(true)
  }


    // Funcionalidad de resolve del posteo
    async function confirmResolvePostHandler(){
      console.log("AMUSINGGG", resolvepostdata)
      try {
        setIsLoading(true);
        const response = await resolvePost(resolvepostdata,token)
        setMessage("El posteo fue resuelto con exito");
        setShowModalReportClose(true);
      } catch (error) {
        setShowBanModal(false)
        setIsError(true);
        setMessage(error.message || "Error desconocido"); // Maneja errores también
        setShowModal(true);
        console.log("mensaje del error", error.message);
      } finally {
        setIsLoading(false);
        setShowResolveModal(false);
      }
    }

  // Funcionalidad de eliminacion del posteo
  async function confirmBanHandler(){
    try {
      setIsLoading(true);
      const response = await banPost(banpostdata,token)
      setMessage("El posteo fue eliminado con exito");
      setShowModalReportClose(true);
    } catch (error) {
      setShowBanModal(false)
      setIsError(true);
      setMessage(error.message || "Error desconocido"); // Maneja errores también
      setShowModalReportClose(true);
      setShowModal(true);
      console.log("mensaje del error", error.message);
    } finally {
      setIsLoading(false);
    }
    setShowReportModal(false);
  }
  
  


  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      {/* modal para que ande bien */}
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandlerReport}
        visible={showModalReportClose}
      />
      {/*ES EL DE CONFIRMAR ELIMINAR POST*/}
      <GluttyModal
        visible={showEliminarModal}
        onClose={closeModalDeleteHandler}
        message="¿Seguro que desea eliminar el post?"
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
      {/*CONFIRMAR REPORTE */}
      <GluttyModal
        visible={showReportModal}
        onClose={closeModalReportHandler}
        message="¿Seguro que desea realizar el reporte?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: confirmModalReportHandler
          },
        ]}
        closeButtonText="Cancelar"
      />
      {/*CONFIRMAR eliminar posteo por reporte */}
      <GluttyModal
        visible={showBanModal}
        onClose={closeModalReportHandler}
        message="¿Seguro que desea dar de baja el posteo?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: confirmBanHandler
          },
        ]}
        closeButtonText="Cancelar"
      />

      {/*CONFIRMAR resolver posteo por reporte */}
      <GluttyModal
        visible={showResolveModal}
        onClose={closeModalReportHandler}
        message="¿Seguro que desea eliminar el reporte del posteo?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: confirmResolvePostHandler
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
          isReportable = {is_reportable}
          handleReportPost={handleReport}
          handleReportUser={handleReport}
          handleBanPost={handleBanPost}
          handleResolvePost={handleResolvePost}
          isAdmin={admin}
        />

        {/* Mostrar los comentarios */}
        {console.log(admin)}
        {(!admin ) && (
        <View>
          {post?.comments?.length > 0 ? (
            post.comments.map((comment, index) => {
              const is_mine = comment.user === username;
              return (
                <Comment
                  key={index}
                  comment={comment}
                  is_mine={is_mine}
                  token={token}
                  onDelete={handleDeleteComment}
                />
              );
            })
          ) : (
            <TextCommonsRegular style={styles.noComments}>
              No hay comentarios aún.
            </TextCommonsRegular>
          )}

          {/* Agregar un nuevo comentario */}
          <AddComment id_post={id} />
        </View>
      )}
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
