import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/Community/AddPostButton";
import { Divider } from "react-native-paper";
import { getInitialPosts, getFavorite } from "../../services/communityService";
import PostItem from "../../components/Community/PostItem";
import PostsSkeleton from "../../components/UI/Loading/PostsSkeleton";
import ErrorPosts from "../../components/Community/ErrorPosts";
import NoPosts from "../../components/Community/NoPosts";
import TextCommonsMedium from "../../components/UI/FontsTexts/TextCommonsMedium";
import {
  COMMUNITY_BOTTOM_INSET,
  communityPaginationFooterStyle,
  PAGE_SIZE,
} from "../../constants/community";
import PaginationFooter from "../../components/UI/Loading/PaginationFooter";

const height = Dimensions.get("window").height * 0.5;

export default function MyPosts({ navigation }) {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;

  useEffect(() => {
    fetchMyPosts();
  }, [page]);

  async function fetchMyPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }

    try {
      const data = await getFavorite(token, page, pageSize);
      
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
          />
        )}
        contentInset={{ bottom: COMMUNITY_BOTTOM_INSET }}
        onEndReached={changePage}
        ListFooterComponent={
          <PaginationFooter
            hasNextPage={hasNextPage}
            style={communityPaginationFooterStyle}
          />
        }
      />
    );
  }

  if (!isLoading && !isError && (!posts || posts.length == 0)) {
    content = <NoPosts>¡Favea el posteo y visualizalo luego aqui!</NoPosts>;
  }

  return (
    <View style={styles.container}>
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
