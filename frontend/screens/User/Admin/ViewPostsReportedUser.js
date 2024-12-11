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

  const { username } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: username });
  }, [username]);

  const data = [
    {
      comments: null,
      comments_number: 1,
      content: "No me gusta esta comunidad",
      date: "20:42 - 04/11/2024",
      faved: true,
      id: 98,
      images: [],
      liked: true,
      likes: 2,
      name: "Agus Gonzalez",
      tags: ["NoMeGusta", "Feo"],
      userImage:
        "https://res.cloudinary.com/dc7sftc2n/image/upload/v1728956435/h7x59zzkszwvh2krjilq.jpg",
      username: "agusGonzalez",
    },
  ];

  useEffect(() => {
    if (isFocused) {
      setPage(1); // Reinicia la página al entrar
      fetchMyPosts(); // Llama a la función para actualizar los posts
    }
  }, [isFocused]);

  async function fetchMyPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }
    try {
      //const userReportedPosts = await getReportedPosts(username, token, page, pageSize);
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

  function blockUser() {
    console.log("Usuario bloqueado");
    // Lógica para bloquear al usuario
  }

  function unblockUser() {
    console.log("Usuario desbloqueado");
    // Lógica para desbloquear al usuario
  }

  return (
    <View>
      {/* Aquí va el contenido para ver las publicaciones reportadas por el usuario */}
      <PostsList
        posts={posts}
        //hasNextPage={hasNextPage}
        //onPageChange={changePage}
        onRefresh={fetchMyPosts}
        isError={isError}
        isLoading={isLoading}
        errorStyle={styles.errorPosts}
        NoContentComponent={() => (
          <NoPosts>¡No hubo nuevos posteos reportados!</NoPosts>
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
              onPress: blockUser,
              color: Colors.humita,
              labelTextColor: Colors.mJordan,
            },
            {
              icon: "check", // Ícono para "No bloquear usuario"
              label: "Anular reporte",
              onPress: unblockUser,
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
