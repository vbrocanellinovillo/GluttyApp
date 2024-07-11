import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Button({ children, backgroundColor, color, onPress, style }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
    };
  });

  const tap = Gesture.Tap()
    .onBegin(() => (scale.value = 1.1))
    .onFinalize(() => (scale.value = 1));

  return (
    <Pressable onPress={onPress}>
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[styles.button, { backgroundColor }, animatedStyle, style]}
        >
          <Text style={[styles.buttonText, { color }]}>{children}</Text>
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
  },

  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
