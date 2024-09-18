import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function AnimatedText({
  initialColor,
  changedColor,
  textStyle,
  children,
  duration,
}) {
  const color = useSharedValue(initialColor || Colors.mJordan);

  const colorStyle = useAnimatedStyle(() => {
    return {
      color: color.value,
    };
  });

  useEffect(() => {
    color.value = withRepeat(
      withTiming(changedColor || Colors.locro, { duration: duration || 350 }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.Text style={colorStyle}>
      <TextCommonsMedium style={[styles.text, textStyle]}>
        {children}
      </TextCommonsMedium>
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontWeight: "500",
  },
});
