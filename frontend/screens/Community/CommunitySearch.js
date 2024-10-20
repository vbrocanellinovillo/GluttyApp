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
  const [results, setResults] = useState([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["community-search", searchTerm],
    enabled: false,
  });

  function handleChageSearchTerm(text) {
    setSearchTerm(text);
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

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <CancelSearch
          onCanel={handleCancel}
          width={animatedWidth}
          onChange={handleChageSearchTerm}
        />
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
