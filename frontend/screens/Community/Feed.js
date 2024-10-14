import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Searchbar from "../../components/UI/Controls/Searchbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFeed } from "../../services/communityService";
import ErrorPosts from "../../components/Community/ErrorPosts";
import PostsSkeleton from "../../components/UI/Loading/PostsSkeleton";
import PostItem from "../../components/Community/PostItem";
import { searchbarStyle } from "../../constants/community";

const height = Dimensions.get("window").height * 0.5;

export default function Feed({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setIsLoading(true);
    try {
      const data = await getFeed(token);
      setFeed(data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearch() {
    navigation.navigate("CommunitySearch");
  }

  let content = <></>;

  if (isLoading) content = <PostsSkeleton />;

  if (isError && !isLoading) content = <ErrorPosts style={styles.errorPosts} />;

  if (!isError && !isLoading && feed && feed.length > 0)
    content = (
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        contentInset={{ bottom: 230 }}
      />
    );

  return (
    <View style={styles.container}>
      <Searchbar
        onFocus={handleSearch}
        unfocus
        disableKeyboard
        style={searchbarStyle}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },

  errorPosts: {
    paddingBottom: height,
  },
});
