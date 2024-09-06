import { Portal } from "react-native-paper";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import BranchDetails from "./BranchDetails";
import LoadingMapBranchDetails from "../UI/Loading/LoadingMapBranchDetails";
import ErrorBranchDetails from "./ErrorBranchDetails";
import { useEffect, useState } from "react";

const screenHeight = Dimensions.get("window").height;

const MIN_HEIGHT = screenHeight * 0.32;
const MAX_HEIGHT = screenHeight * 0.8;
const CLOSE_THRESHOLD = screenHeight * 0.27;
const MID_HEIGHT = screenHeight * 0.5;
const WITH_SECTION = screenHeight * 0.54;
const THREE_QUARTER_SECTION = screenHeight * 0.72;
const HALF_SECTION = screenHeight * 0.53;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DetailsContainer({
  visible,
  onDismiss,
  branch,
  isError,
  isLoading,
}) {
  const height = useSharedValue(MIN_HEIGHT);
  const [maxHeight, setMaxHeight] = useState(MAX_HEIGHT);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  function handleDismiss() {
    height.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(onDismiss)();
    });
  }

  const Pan = Gesture.Pan()
    .onChange(({ y }) => {
      const newHeight = height.value - y;

      if (newHeight <= maxHeight) {
        height.value = newHeight;
      }
    })
    .onFinalize(() => {
      if (height.value < CLOSE_THRESHOLD) {
        height.value = withTiming(0, { duration: 100 }, () => {
          runOnJS(onDismiss)();
        });
      }
    });

  // Para que cuando lo abra se valla a esa altura
  useEffect(() => {
    if (visible) {
      height.value = withTiming(MID_HEIGHT);
    }
  }, [visible]);


  useEffect(() => {
    if (!isLoading && !isError) {
      height.value = withSpring(MAX_HEIGHT);
    }
  }, [isLoading]);

  let content = <></>;

  if (isLoading) {
    content = <LoadingMapBranchDetails />;
  }

  if (isError) {
    content = <ErrorBranchDetails />;
  }

  if (branch && !isLoading) {
    content = <BranchDetails branch={branch} />;
  }

  return (
    <>
      {visible && (
        <Portal>
          <View style={styles.backdrop}>
            <AnimatedPressable
              onPress={handleDismiss}
              style={StyleSheet.absoluteFill}
              entering={FadeIn}
              exiting={FadeOut}
            />
            <GestureDetector gesture={Pan}>
              <Animated.View style={[styles.container, animatedHeight]}>
                {content}
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  container: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
