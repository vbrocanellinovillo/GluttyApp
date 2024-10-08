import { StyleSheet, View } from "react-native";
import WelcomeMessage from "../../components/Community/WelcomeMessage";
import GluttyFeedButton from "../../components/Community/GluttyFeedButton";
import InitialPosts from "../../components/Community/InitialPosts";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <WelcomeMessage />
      <GluttyFeedButton />
      <InitialPosts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 34,
    gap: 30,
  },
});
