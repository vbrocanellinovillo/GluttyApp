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
import { useCallback } from "react";
import {
  searchbarAnimationDuration,
  searchbarWidthPercentage,
} from "../../constants/community";

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

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <CancelSearch onCanel={handleCancel} width={animatedWidth} />
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
