import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Searchbar from "../../components/UI/Controls/Searchbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../services/communityService";
import ErrorPosts from "../../components/Community/ErrorPosts";
import PostsSkeleton from "../../components/UI/Loading/PostsSkeleton";
import PostItem from "../../components/Community/PostItem";
import { searchbarStyle } from "../../constants/community";
import ButtonsOptions from "../../components/UI/Controls/ButtonsOptions";
import { Colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import NoPosts from "../../components/Community/NoPosts";
import TagChips from "../../components/Community/TagChips";
import { communityActions } from "../../context/community";

const height = Dimensions.get("window").height * 0.5;

const OPTIONS = [
  { id: 1, value: "Populares" },
  { id: 2, value: "Recientes" },
];

export default function Feed({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(1);

  const tags = useSelector((state) => state.community.tags);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["feed", selectedOption, tags],
    queryFn: ({ signal }) => getFeed(token, selectedOption, tags, signal),
  });

  function handleChangeOption(option) {
    setSelectedOption(option);
  }

  function handleSearch() {
    navigation.navigate("CommunitySearch");
  }

  function handleRemoveFilter(filter) {
    dispatch(communityActions.removeTag({ tag: filter }));
  }

  let content = <></>;

  if (isLoading) content = <PostsSkeleton />;

  if (isError && !isLoading) content = <ErrorPosts style={styles.errorPosts} />;

  if (!isError && !isLoading && data && data.length > 0)
    content = (
      <FlatList
        data={data}
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

  if (!isError && !isLoading && data && data.length == 0) {
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
