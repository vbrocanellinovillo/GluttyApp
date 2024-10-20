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

const height = Dimensions.get("window").height * 0.5;

export default function MyPosts({ navigation }) {
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
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
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
        contentInset={{ bottom: 230 }}
      />
    );
  }

  if (!isLoading && !isError && (!posts || posts.length == 0)) {
    content = <NoPosts />;
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
