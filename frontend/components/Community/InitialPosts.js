import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { getInitialPosts } from "../../services/communityService";
import PostsSkeleton from "../UI/Loading/PostsSkeleton";
import PostItem from "./PostItem";
import ErrorPosts from "./ErrorPosts";
import NoPosts from "./NoPosts";
import {
  communityPaginationFooterStyle,
  PAGE_SIZE,
} from "../../constants/community";
import PaginationFooter from "../UI/Loading/PaginationFooter";
import PostsList from "./PostsList";

const height = Dimensions.get("window").height * 0.2;

export default function InitialPosts() {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;

  useEffect(() => {
    fetchPosts();
  }, [page]);

  async function fetchPosts() {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      setIsLoading(true);
    }

    try {
      const data = await getInitialPosts(token, page, pageSize);

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
    <View>
      <PostsList
        posts={posts}
        curved
        hasNextPage={hasNextPage}
        onPageChange={changePage}
        onRefresh={fetchPosts}
        isError={isError}
        isLoading={isLoading}
        style={styles.list}
        NoContentComponent={() => (
          <NoPosts>Explora los posteos de la comunidad!</NoPosts>
        )}
        bottomInset={700}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 2,
    gap: 16,
  },
});
