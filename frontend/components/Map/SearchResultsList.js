import { FlatList, StyleSheet } from "react-native";
import SearchResultItem from "./SearchResultItem";
import MapSearchSkeleton from "../UI/Loading/MapSearchSkeleton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

RESULTS_HEIGHT = 450;

export default function SearchResultsList({
  searchResults,
  isLoading,
  focused,
  hideResults,
  handleShowSearchResults,
  onChangeLocation,
}) {
  if (isLoading) return <MapSearchSkeleton />;

  if (!searchResults && !isLoading) return <></>;

  const resultsHeight = useSharedValue(0);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(resultsHeight.value, { duration: 400 }),
    };
  });

  useEffect(() => {
    if (focused) {
      handleShowSearchResults();
    } else if (!focused && hideResults) {
      resultsHeight.value = 0;
    }
  }, [focused]);

  useEffect(() => {
    if (hideResults) {
      resultsHeight.value = 0;
    } else {
      if (searchResults) {
        const newHeight = searchResults.length * 100;
        const minHeight = 150;
        if (newHeight > 450) {
          resultsHeight.value = 450;
        } else {
          resultsHeight.value = Math.max(newHeight, minHeight);
        }
      }
    }
  }, [hideResults, searchResults]);

  function changeLocation(location) {
    onChangeLocation(location);
  }

  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <>
          <Animated.View style={animatedHeight}>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <SearchResultItem item={item} onPress={changeLocation} />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.resultsList}
            />
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultsList: {
    gap: 12,
  },

  icon: {
    alignItems: "center",
  },
});
