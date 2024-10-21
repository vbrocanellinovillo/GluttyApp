import { Dimensions, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../../components/UI/Forms/DismissKeyboadContainer";
import CancelSearch from "../../components/Community/CancelSearch";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  searchbarAnimationDuration,
  searchbarWidthPercentage,
} from "../../constants/community";
import { useQuery } from "@tanstack/react-query";
import { searchCommunity } from "../../services/communityService";
import { useSelector } from "react-redux";
import SearchResultsList from "../../components/Community/SearchResultsList";
import CommunitySearchSkeleton from "../../components/UI/Loading/CommunitySearchSkeleton";
import NoSearchResults from "../../components/Community/NoSearchResults";

const screenWidth = Dimensions.get("window").width;

export default function CommunitySearch({ navigation }) {
  const width = useSharedValue(screenWidth);

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      width.value = withTiming(screenWidth * searchbarWidthPercentage, {
        duration: searchbarAnimationDuration,
      });
    })
  );

  function handleCancel() {
    width.value = withTiming(
      screenWidth,
      { duration: searchbarAnimationDuration },
      (finished) => {
        if (finished) {
          runOnJS(navigation.navigate)("Feed");
        }
      }
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth?.accessToken);

  const [results, setResults] = useState([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["community-search", searchTerm],
    queryFn: ({ signal }) => searchCommunity(token, searchTerm, signal),
    enabled: false,
  });

  function handleChageSearchTerm(text) {
    setSearchTerm(text);
  }

  function handleClearText() {
    setSearchTerm("");
  }

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([]);
      return;
    } else {
      refetch();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (data) {
      setResults(data);
    }
  }, [data]);

  let content = <></>;

  if (isLoading) {
    content = <CommunitySearchSkeleton />;
  } else if (isError) {
    content = (
      <NoSearchResults>
        Ocurrio un error. Por favor intente de nuevo más tarde
      </NoSearchResults>
    );
  } else if (data && results.length > 0) {
    content = <SearchResultsList results={results} />;
  } else if (data && results.length == 0) {
    content = <NoSearchResults>No se encontraron resultados</NoSearchResults>;
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <CancelSearch
          onCanel={handleCancel}
          onClear={handleClearText}
          width={animatedWidth}
          onChange={handleChageSearchTerm}
          value={searchTerm}
        />
        <View style={styles.content}>{content}</View>
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 6,
  },
});
