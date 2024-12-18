import { Dimensions, StyleSheet, View } from "react-native";
import Searchbar from "../../components/UI/Controls/Searchbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../services/communityService";
import { PAGE_SIZE, searchbarStyle } from "../../constants/community";
import ButtonsOptions from "../../components/UI/Controls/ButtonsOptions";
import { Colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import NoPosts from "../../components/Community/NoPosts";
import TagChips from "../../components/Community/TagChips";
import { communityActions } from "../../context/community";
import PostsList from "../../components/Community/PostsList";

const height = Dimensions.get("window").height * 0.5;

const OPTIONS = [
  { id: 1, value: "Populares" },
  { id: 2, value: "Recientes" },
];

export default function Feed({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(1);
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = PAGE_SIZE;

  // Le cambio el numero para que refresque sin afectar la cache
  const [refresh, setRefresh] = useState(0);

  const results = useSelector((state) => state.community?.results);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["feed", selectedOption, results, refresh],
    queryFn: ({ signal }) =>
      getFeed(token, selectedOption, results, signal, page, pageSize),
  });

  function handleChangeOption(option) {
    setPage(1);
    setSelectedOption(option);
  }

  function handleSearch() {
    navigation.navigate("CommunitySearch");
  }

  function handleRemoveFilter(filter) {
    dispatch(communityActions.removeResult({ result: filter }));
  }

  useEffect(() => {
    if (data) {
      setPosts((prevPosts) => (page === 1 ? data : [...prevPosts, ...data]));
      setHasNextPage(data?.length === pageSize);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  function changePage() {
    if (hasNextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function refreshPosts() {
    setRefresh((prevRefresh) => prevRefresh + 1);
  }

  if (data && posts.length === 0) return;

  return (
    <View style={styles.container}>
      <Searchbar
        onFocus={handleSearch}
        unfocus
        disableKeyboard
        style={searchbarStyle}
        placeholder="Explora en la comunidad!"
      />
      <ButtonsOptions
        options={OPTIONS}
        containerStyle={styles.filters}
        selectedColor={Colors.oceanBlue}
        defaultColor="#ccc"
        textStyle={styles.textFilterStyle}
        selectedTextStyle={styles.selectedTextStyle}
        onSelect={handleChangeOption}
      />
      {results && <TagChips tags={results} onDeleteTag={handleRemoveFilter} />}
      <PostsList
        posts={posts}
        hasNextPage={hasNextPage}
        onPageChange={changePage}
        onRefresh={refreshPosts}
        isError={isError}
        isLoading={isLoading}
        style={styles.list}
        NoContentComponent={() => (
          <NoPosts onRefresh={refreshPosts}>
            Comienza a compartir tus experiencias con la comunidad!
          </NoPosts>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  filters: {
    paddingHorizontal: 22,
    backgroundColor: "transparent",
    marginBottom: 10,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    gap: 10,
  },

  textFilterStyle: {
    color: Colors.mJordan,
  },

  selectedTextStyle: {
    color: Colors.lightOcean,
  },

  errorPosts: {
    paddingBottom: height,
  },
});
