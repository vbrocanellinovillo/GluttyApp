import { useEffect, useState, useCallback } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/Community/AddPostButton";
import { Divider } from "react-native-paper";
import { getMyPosts } from "../../services/communityService";
import NoPosts from "../../components/Community/NoPosts";
import { PAGE_SIZE } from "../../constants/community";
import { useFocusEffect } from "@react-navigation/native";
import PostsList from "../../components/Community/PostsList";

const height = Dimensions.get("window").height * 0.5;

export default function MyPosts({ route }) {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;

  const refresh = route?.params?.refresh ?? false;

  useEffect(() => {
    fetchMyPosts();
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      if (refresh) {
        fetchMyPosts();
      }
    }, [refresh])
  );

  async function fetchMyPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }

    try {
      const data = await getMyPosts(token, page, pageSize);

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

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AddPostButton style={styles.button} />
      </View>
      <Divider />
      <PostsList
        posts={posts}
        hasNextPage={hasNextPage}
        onPageChange={changePage}
        onRefresh={fetchMyPosts}
        isError={isError}
        isLoading={isLoading}
        style={styles.list}
        NoContentComponent={() => (
          <NoPosts>
            Comienza a publicar tus posteos para compartir con la comunidad!
          </NoPosts>
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
