import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function AnimatedImage({ style, uri }) {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const scale = useSharedValue(1);

  const animatedImage = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(offsetX.value) },
        { translateY: withSpring(offsetY.value) },
        { scale: withSpring(scale.value) },
      ],
    };
  });

  const Pan = Gesture.Pan()
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onEnd(() => {
      offsetX.value = 0;
      offsetY.value = 0;
    });

  const Pinch = Gesture.Pinch()
    .onChange((event) => (scale.value = event.scale))
    .onEnd(() => (scale.value = 1));

  const Simultanteous = Gesture.Simultaneous(Pan, Pinch);

  return (
    <GestureDetector gesture={Simultanteous}>
      <Animated.Image source={{ uri: uri }} style={[style, animatedImage]} />
    </GestureDetector>
  );
}
