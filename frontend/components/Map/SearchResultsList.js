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

RESULTS_HEIGHT = 600;

export default function SearchResultsList({
  searchResults,
  isLoading,
  focused,
}) {
  if (isLoading) return <MapSearchSkeleton />;

  if (!searchResults && !isLoading) return <></>;

  const resultsHeight = useSharedValue(RESULTS_HEIGHT);

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

  const [hideResults, setHideResults] = useState(false);

  useEffect(() => {
    if (focused) {
      setHideResults(false);
    } else if (!focused && hideResults) {
      resultsHeight.value = 0;
    }
  }, [focused]);

  useEffect(() => {
    if (hideResults) {
      resultsHeight.value = 30;
      rotate.value = 0;
    } else {
      resultsHeight.value = RESULTS_HEIGHT;
      rotate.value = 180;
    }
  }, [hideResults]);

  function hideResultsList() {
    setHideResults(true);
  }

  function showResults() {
    setHideResults(false);
  }

  return (
    <>
      {searchResults && searchResults.length > 0 && (
        <>
          <Animated.View style={animatedHeight}>
            <View style={styles.resultsContainer}>
              <FlatList
                data={searchResults}
                renderItem={({ item }) => <SearchResultItem item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.resultsList}
              />
            </View>
            {hideResults && (
              <TouchableOpacity onPress={showResults}>
                <Animated.View style={[styles.icon, rotateStyle]}>
                  <Ionicons
                    name="chevron-down"
                    color={Colors.mJordan}
                    size={24}
                  />
                </Animated.View>
              </TouchableOpacity>
            )}
            <Pressable style={styles.backdrop} onPress={hideResultsList} />
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 3,
  },

  resultsList: {
    gap: 12,
    paddingBottom: 20,
  },

  backdrop: {
    flex: 1,
  },

  icon: {
    alignItems: "center",
  },
});
