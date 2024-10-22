import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/Community/AddPostButton";
import { Divider } from "react-native-paper";
import { getMyPosts } from "../../services/communityService";
import PostItem from "../../components/Community/PostItem";
import PostsSkeleton from "../../components/UI/Loading/PostsSkeleton";
import ErrorPosts from "../../components/Community/ErrorPosts";
import NoPosts from "../../components/Community/NoPosts";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import { useFocusEffect } from "@react-navigation/native";

const height = Dimensions.get("window").height * 0.5;

export default function MyPosts({ navigation, route }) {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //const refresh = route.params.refresh || null;
  //console.log("route:", route);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // useFocusEffect(()=> {
  //   if (refresh) {
  //     fetchMyPosts();
  //   } else {
  //     console.log("NO REFRESH");
  //   }
  // }, [route]);

  async function fetchMyPosts() {
    setIsLoading(true);
    try {
      const data = await getMyPosts(token);
      setPosts(data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Confirmación de la eliminación
  async function handleConfirmDelete(id) {
    console.log("acaandoooo");
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
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  }

  let content = <></>;

  if (isLoading) {
    content = <PostsSkeleton />;
  }

  if (isError && !isLoading) {
    content = <ErrorPosts style={styles.errorPosts} />;
  }

  if (!isLoading && !isError && posts && posts.length > 0) {
    content = (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onPress={() => navigation.navigate("ViewPostById", { id: item.id })}
            onPressIcon={handleConfirmDelete}
          />
        )}
        contentInset={{ bottom: 230 }}
      />
    );
  }

  if (!isLoading && !isError && (!posts || posts.length == 0)) {
    content = (
      <NoPosts>
        Comienza a publicar tus posteos para compartir con la comunidad!
      </NoPosts>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AddPostButton style={styles.button} />
      </View>
      <Divider />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  button: {
    paddingHorizontal: 70,
  },

  errorPosts: {
    paddingBottom: height,
  },
});
