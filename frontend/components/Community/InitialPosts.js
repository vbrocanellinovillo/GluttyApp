import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { getInitialPosts } from "../../services/communityService";
import PostsSkeleton from "../UI/Loading/PostsSkeleton";
import PostItem from "./PostItem";
import ErrorPosts from "./ErrorPosts";

const height = Dimensions.get("window").height * 0.2;

export default function InitialPosts() {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const data = await getInitialPosts(token);
      setPosts(data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <PostsSkeleton curved style={styles.list} />;
  }

  if (!isLoading && isError) {
    return (
      <ErrorPosts curved postsStyle={styles.list} style={styles.errorPosts} />
    );
  }

  return (
    <View>
      {posts?.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem post={item} curved />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 2,
    gap: 16,
    paddingBottom: 750,
  },

  errorPosts: {
    height: "30%",
    paddingBottom: height,
  },
});
