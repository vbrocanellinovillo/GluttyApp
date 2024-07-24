import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function DetailContainer({ children, style }) {
  return (
    <Animated.View style={style} entering={FadeIn} exiting={FadeOut}>
      {children}
    </Animated.View>
  );
}

