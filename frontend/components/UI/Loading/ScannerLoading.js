import { Image, StyleSheet, Text } from "react-native";
import DetailContainer from "../../Scanner/DetailContainer";
import { jumpingGlutty } from "../../../constants/glutty";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../../constants/colors";
import { useEffect } from "react";

export default function ScannerLoading() {
  const color = useSharedValue(Colors.mJordan);

  const colorStyle = useAnimatedStyle(() => {
    return {
      color: color.value,
    };
  });

  useEffect(() => {
    color.value = withRepeat(
      withTiming(Colors.locro, { duration: 350 }),
      -1,
      true
    );
  }, []);

  return (
    <DetailContainer style={styles.container}>
      <Image source={{ uri: jumpingGlutty }} style={styles.image} />
      <Animated.Text style={colorStyle}>
        <TextCommonsMedium style={styles.text}>Escaneando...</TextCommonsMedium>
      </Animated.Text>
    </DetailContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },

  image: {
    width: "100%",
    height: 130,
    objectFit: "contain",
  },

  text: {
    fontSize: 22,
    fontWeight: "500",
  },
});
