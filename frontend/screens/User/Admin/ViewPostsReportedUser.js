import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { PAGE_SIZE } from "../../../constants/community";
import PostsList from "../../../components/Community/PostsList";
import NoPosts from "../../../components/Community/NoPosts";
import { FAB, Portal } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import { blockUser, getPostsReportedUser, resolveReport } from "../../../services/adminService";
import GluttyModal from "../../../components/UI/GluttyModal";
import ReasonBlock from "../../../components/Admin/ReasonBlock";

export default function ViewPostsReportedUser({ navigation, route }) {
  const token = useSelector((state) => state.auth.accessToken);
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;
  const [isFABOpen, setIsFABOpen] = useState(false);
  const [modalConfirmResolve, setModalConfirmResolve] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showReasonBlockModal, setShowReasonBlockModal] = useState(false);
  const [isSubmittingReason, setIsSubmittingReason] = useState(false);

  

  const { username, id } = route.params;
  //console.log("id", id);

  useLayoutEffect(() => {
    navigation.setOptions({ title: username });
  }, [username]);

  useEffect(() => {
    if (isFocused) {
      setPage(1); // Reinicia la página al entrar
      fetchMyPosts(); // Llama a la función para actualizar los posts
    }
  }, [id, isFocused]);

  async function fetchMyPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }
    try {
      const data = await getPostsReportedUser(id, token, page, pageSize);
      if (data) {
        setPosts((prevPosts) => (isFirstPage ? data : [...prevPosts, ...data]));
        setHasNextPage(data?.length === pageSize);
      }
      
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function changePage() {
    if (hasNextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  async function unblockUser(id) {
    try {
      //console.log("Usuario resuelto/ublock");
      setModalConfirmResolve(false);
      await resolveReport(id, token);
      setMessage("Reporte resuelto");
      setShowModal(true);
    } catch (error) {
      setIsError(error);
      setMessage("Error al resolver el reporte");
      setShowModal(true);
    }
  }

  function closeModalReportHandler(){
    setModalConfirmResolve(false)
  }

  async function closeModalHandler() {
    setShowModal(false);

    // Ejecutar callback si existe
    if (route.params?.onGoBack) {
      route.params.onGoBack();
    }
    // Navegar hacia atrás
    navigation.goBack();
  }

  async function handleBlock(reason) {
    try {
        setShowReasonBlockModal(false);
        await blockUser(id, reason, token);
        setMessage("Usuario bloqueado con éxito!");
        setShowModal(true);
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Error al bloquear el usuario";
        setIsError(true);
        setMessage(errorMessage);
        setShowModal(true);
    } 
}


  return (
    <View>
      {/* Aquí va el contenido para ver las publicaciones reportadas por el usuario */}
      <PostsList
        posts={posts}
        hasNextPage={hasNextPage}
        onPageChange={changePage}
        onRefresh={fetchMyPosts}
        isError={isError}
        isLoading={isLoading}
        errorStyle={styles.errorPosts}
        NoContentComponent={() => (
          <NoPosts>¡No hay posteos!</NoPosts>
        )}
      />
      <Portal>
        <FAB.Group
          open={isFABOpen}
          icon="dots-horizontal" // Cambiar por el ícono que desees
          backdropColor="transparent"
          actions={[
            {
              icon: "block-helper", // Ícono para "Bloquear usuario"
              label: "Bloquear usuario",
              onPress: () => setShowReasonBlockModal(true),
              color: Colors.humita,
              labelTextColor: Colors.mJordan,
            },
            {
              icon: "check", // Ícono para "No bloquear usuario"
              label: "Anular reporte",
              onPress: () => setModalConfirmResolve(true),
              color: Colors.humita,
              labelTextColor: Colors.mJordan,
            },
          ]}
          onStateChange={({ open }) => setIsFABOpen(open)}
          visible={true}
          style={styles.botonFlotante}
          fabStyle={{ backgroundColor: Colors.locro }}
          rippleColor="transparent"
        />
      </Portal>

      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      {/*ES EL DE CONFIRMAR ALGO*/}
      <GluttyModal
        visible={modalConfirmResolve}
        onClose={closeModalReportHandler}
        message="¿Seguro que desea resolver la denuncia?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: () => unblockUser(id)
          },
        ]}
        closeButtonText="Cancelar"
      />
      <ReasonBlock
        visible={showReasonBlockModal}
        onClose={() => setShowReasonBlockModal(false)}
        onConfirm={(reason) => {
          handleBlock(reason)
        }}
        //isLoading={isSubmittingReason}
      />
    </View>
  
  );
}

const styles = StyleSheet.create({
  titulo: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  
  botonFlotante: {
    position: "absolute",
    bottom: 80,
    //right: 5
  },
});
