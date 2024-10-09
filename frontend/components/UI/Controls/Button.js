import { Pressable, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../../../constants/colors";

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
  iconStyle,
  opacityPress,
  isLoading,
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
    onPress && onPress();
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <GestureDetector gesture={tap}>
        <Animated.View
          style={[
            styles.button,
            { backgroundColor },
            !opacityPress && animatedStyle,
            style,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.mJordan} />
          ) : (
            <>
              {leftIcon ? (
                <Ionicons
                  name={leftIcon}
                  size={iconSize}
                  color={iconColor}
                  style={iconStyle}
                />
              ) : (
                <View />
              )}
              <TextCommonsRegular
                style={[styles.buttonText, { color }, textStyle]}
              >
                {children}
              </TextCommonsRegular>
              {rightIcon ? (
                <Ionicons
                  name={rightIcon}
                  size={iconSize}
                  color={iconColor}
                  style={iconStyle}
                />
              ) : (
                <View />
              )}
            </>
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

  pressed: {
    opacity: 0.4,
  },
});
