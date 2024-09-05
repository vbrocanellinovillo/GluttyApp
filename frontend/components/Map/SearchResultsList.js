import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SearchResultItem from "./SearchResultItem";
import MapSearchSkeleton from "../UI/Loading/MapSearchSkeleton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

RESULTS_HEIGHT = 450;

export default function SearchResultsList({
  searchResults,
  isLoading,
  focused,
  hideResults,
  handleHideSearchResults,
  handleShowSearchResults,
}) {
  if (isLoading) return <MapSearchSkeleton />;

  if (!searchResults && !isLoading) return <></>;

  const resultsHeight = useSharedValue(0);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(resultsHeight.value, { duration: 400 }),
    };
  });

  const rotate = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: withSpring(`${rotate.value}deg`, { stiffness: 300 }) },
      ],
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
      rotate.value = 0;
    } else {
      if (searchResults) {
        const newHeight = searchResults.length * 100;
        if (newHeight > 450) {
          resultsHeight.value = 450;
        } else {
          resultsHeight.value = newHeight;
        }
      }
      rotate.value = 180;
    }
  }, [hideResults, searchResults]);


  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <>
          <Animated.View style={animatedHeight}>
            <FlatList
              data={searchResults}
              renderItem={({ item }) => <SearchResultItem item={item} />}
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
    paddingBottom: 20,
  },

  icon: {
    alignItems: "center",
  },
});
