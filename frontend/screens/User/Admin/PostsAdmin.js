import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Divider } from "react-native-paper";
import { getReportedPosts } from "../../../services/adminService";
import NoPosts from "../../../components/Community/NoPosts";
import { useIsFocused } from "@react-navigation/native";
import { PAGE_SIZE } from "../../../constants/community";
import PostsList from "../../../components/Community/PostsList";
const height = Dimensions.get("window").height * 0.5;

export default function MyPosts() {
  const token = useSelector((state) => state.auth.accessToken);
  const isFocused = useIsFocused(); // Verifica si la pantalla está enfocada

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;

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
      const data = await getReportedPosts(token, page, pageSize);
      console.log("data", data);
      if (data) {
        setPosts((prevPosts) => (isFirstPage ? data : [...prevPosts, ...data]));
        setHasNextPage(data?.length === pageSize);
      }
      setIsError(false);
    } catch (error) {
      console.log(error)
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

  return (
    <View style={styles.container}>
      <Divider />
      <PostsList
        posts={posts}
        hasNextPage={hasNextPage}
        onPageChange={changePage}
        onRefresh={fetchMyPosts}
        isError={isError}
        isLoading={isLoading}
        errorStyle={styles.errorPosts}
        isAdmin={true}
        NoContentComponent={() => (
          <NoPosts>¡GUAU! Que hermosa comunidad sin reportes</NoPosts>

        )}
      />
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

