import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";

export default function Button({
  children,
  backgroundColor,
  color,
  onPress,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  iconSize,
  iconColor,
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  const tap = Gesture.Tap()
    .onBegin(() => (scale.value = 1.1))
    .onFinalize(() => (scale.value = 1));

  function pressHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  }

  return (
    <Pressable onPress={pressHandler}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[styles.button, { backgroundColor }, animatedStyle, style]}
        >
          {leftIcon ? (
            <Ionicons name={leftIcon} size={iconSize} color={iconColor} />
          ) : (
            <View />
          )}
          <Text style={[styles.buttonText, { color }, textStyle]}>
            {children}
          </Text>
          {rightIcon ? (
            <Ionicons name={rightIcon} size={iconSize} color={iconColor} />
          ) : (
            <View />
          )}
        </Animated.View>
      </GestureDetector>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
