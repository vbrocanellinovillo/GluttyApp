import { Portal } from "react-native-paper";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BranchDetails from "./BranchDetails";

const screenHeight = Dimensions.get("window").height;

const MIN_HEIGHT = screenHeight * 0.25;
const MAX_HEIGHT = screenHeight * 0.75;
const FIRST_MID_HEIGHT = screenHeight * 0.4;
const MID_HEIGHT = screenHeight * 0.5;
const SECOND_MID_HEIGHT = screenHeight * 0.6;

export default function DetailsContainer({ visible, onDismiss, branch }) {
  const height = useSharedValue(MAX_HEIGHT);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const Pan = Gesture.Pan().onChange(({ y }) => {
    const newHeight = height.value - y;

    if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) {
      height.value = newHeight;
    }
  });

  return (
    <>
      {visible && (
        <Portal>
          <View style={styles.backdrop}>
            <Pressable
              onPress={onDismiss}
              style={StyleSheet.absoluteFill}
            ></Pressable>
            <GestureDetector gesture={Pan}>
              <Animated.View
                style={[styles.container, animatedHeight]}
                entering={SlideInDown}
              >
                <BranchDetails />
              </Animated.View>
            </GestureDetector>
          </View>
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  container: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
