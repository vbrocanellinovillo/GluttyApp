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
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import DragHandle from "./DragHandle";

const screenHeight = Dimensions.get("window").height;

const MIN_HEIGHT = screenHeight * 0.32;
const MAX_HEIGHT = screenHeight * 0.8;
const CLOSE_THRESHOLD = screenHeight * 0.27;
const MID_HEIGHT = screenHeight * 0.5;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedInfoDetails({
  visible,
  onDismiss,
  isError,
  isLoading,
  children,
  minimum,
  maximum,
  disableGesture = false,
  DragComponent,
}) {
  const height = useSharedValue(minimum ? minimum : MIN_HEIGHT);
  const [maxHeight, setMaxHeight] = useState(maximum ? maximum : MAX_HEIGHT);

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
      height.value = withSpring(maximum ? maximum : MAX_HEIGHT);
    }
  }, [isLoading]);

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
            {disableGesture ? (
              <Animated.View style={[styles.container, animatedHeight]}>
                {DragComponent && <DragComponent />}
                {children}
              </Animated.View>
            ) : (
              <Animated.View style={[styles.container, animatedHeight]}>
                <GestureDetector gesture={Pan}>
                  <View>
                    {isLoading || isError ? null : DragComponent ? (
                      <DragComponent />
                    ) : (
                      <DragHandle />
                    )}
                  </View>
                </GestureDetector>
                {children}
              </Animated.View>
            )}
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
