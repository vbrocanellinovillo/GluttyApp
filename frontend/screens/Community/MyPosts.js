import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import AddPostButton from "../../components/Community/AddPostButton";
import { Divider } from "react-native-paper";
import { getMyPosts } from "../../services/communityService";
import Post from "../../components/Community/Post";

export default function MyPosts() {
  const token = useSelector((state) => state.auth.accessToken);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  async function fetchMyPosts() {
    setIsLoading(true);
    try {
      const data = await getMyPosts(token);
      setPosts(data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AddPostButton style={styles.button} />
      </View>
      <Divider />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        contentInset={{ bottom: 230 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  button: {
    paddingHorizontal: 70,
  },
});
