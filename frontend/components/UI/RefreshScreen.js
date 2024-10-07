import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../constants/colors";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const FIRST_BREAKPOINT = screenHeight * 0.01;
const SECOND_BREAKPOINT = screenHeight * 0.05;
const THIRD_BREAKPOINT = screenHeight * 0.07;

export default function RefreshScreen() {
  const opacity = useSharedValue(0);
  //const translateY = useSharedValue(-50);
  const curveValue = useSharedValue(0);
  const height = useSharedValue(0);

  /* const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      if (contentOffset.y < 0) {
        //translateY.value = withTiming(0);
        height.value = Math.abs(contentOffset.y);
        console.log(height.value);
        

        const normalizedOffset = Math.min(Math.abs(contentOffset.y) / 50, 1);
        opacity.value = withTiming(normalizedOffset);

        curveValue.value = Math.min(Math.abs(contentOffset.y * 2), 80);
      }
    },

    onMomentumEnd: () => {
      //translateY.value = withTiming(-50, { duration: 50 });
      opacity.value = withTiming(0);

      curveValue.value = withSpring(0, { damping: 2, stiffness: 100 });
    },
  });
 */

  const pullToRefreshStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      opacity: opacity.value,
      //transform: [{ translateY: translateY.value }],
    };
  });

  const curveStyle = useAnimatedStyle(() => {
    const startX = screenWidth * 0.3;
    const endX = screenWidth * 0.7;
    const controlY = curveValue.value;
    const curvature = screenWidth * 0.5;

    const d = `M ${startX},0 Q ${curvature},${controlY} ${endX},0`;

    return { d };
  });

  console.log(screenHeight * 0.02);

  const Pan = Gesture.Pan()
    .onChange(({ translationY }) => {
      if (translationY < 0) return;

      if (translationY > 0 && translationY < SECOND_BREAKPOINT) {
        opacity.value = withTiming(0.3);
      } else if (SECOND_BREAKPOINT >= 30 && translationY < THIRD_BREAKPOINT) {
        opacity.value = withTiming(0.7);
      } else if (translationY >= THIRD_BREAKPOINT) {
        opacity.value = withTiming(1);
      }

      height.value = translationY;
      curveValue.value = Math.min(translationY, 200);
    })
    .onEnd(() => {
      curveValue.value = withSpring(0);
      opacity.value = withTiming(0);
      height.value = withSpring(0, { damping: 10 });
    });

  return (
    <GestureDetector gesture={Pan}>
      <View style={styles.container}>
        <Animated.View style={[styles.refreshControl, pullToRefreshStyle]}>
          <Svg>
            <AnimatedPath
              animatedProps={curveStyle}
              fill="none"
              stroke={Colors.mJordan}
              strokeWidth={3}
            />
          </Svg>
        </Animated.View>
        <View>
          <TextCommonsMedium>nose</TextCommonsMedium>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  refreshControl: {
    justifyContent: "center",
    paddingTop: 5,
  },
});
