import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { getInitialPosts } from "../../services/communityService";
import Post from "./Post";

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
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {posts?.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post post={item} curved />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  list: {
    padding: 2,
    gap: 16,
    paddingBottom: 750,
  },
});
