import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Searchbar from "../../components/UI/Controls/Searchbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../services/communityService";
import ErrorPosts from "../../components/Community/ErrorPosts";
import PostsSkeleton from "../../components/UI/Loading/PostsSkeleton";
import PostItem from "../../components/Community/PostItem";
import {
  COMMUNITY_BOTTOM_INSET,
  communityPaginationFooterStyle,
  PAGE_SIZE,
  searchbarStyle,
} from "../../constants/community";
import ButtonsOptions from "../../components/UI/Controls/ButtonsOptions";
import { Colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import NoPosts from "../../components/Community/NoPosts";
import TagChips from "../../components/Community/TagChips";
import { communityActions } from "../../context/community";
import PaginationFooter from "../../components/UI/Loading/PaginationFooter";

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

  const tags = useSelector((state) => state.community.tags);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["feed", selectedOption, tags],
    queryFn: ({ signal }) =>
      getFeed(token, selectedOption, tags, signal, page, pageSize),
  });

  function handleChangeOption(option) {
    setPage(1);
    setSelectedOption(option);
  }

  function handleSearch() {
    navigation.navigate("CommunitySearch");
  }

  function handleRemoveFilter(filter) {
    dispatch(communityActions.removeTag({ tag: filter }));
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

  let content = <></>;

  if (isLoading) content = <PostsSkeleton />;

  if (isError && !isLoading)
    content = (
      <ErrorPosts style={styles.errorPosts} onRefresh={() => refetch()} />
    );

  if (!isError && !isLoading && data && posts.length > 0)
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

  if (!isError && !isLoading && data && posts.length == 0) {
    content = (
      <NoPosts>Comienza a compartir tus experiencias con la comunidad!</NoPosts>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        onFocus={handleSearch}
        unfocus
        disableKeyboard
        style={searchbarStyle}
        placeholder="Búsqueda de etiquetas..."
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
      {tags && <TagChips tags={tags} onDeleteTag={handleRemoveFilter} />}
      {content}
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
