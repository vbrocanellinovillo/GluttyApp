import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Form({ children }) {
  return (
    <Animated.View
      style={styles.form}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "85%",
    paddingHorizontal: 14,
  },
});
