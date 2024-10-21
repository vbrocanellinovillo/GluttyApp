import { StyleSheet, View } from "react-native";
import GluttyFeedButton from "../../components/Community/GluttyFeedButton";
import InitialPosts from "../../components/Community/InitialPosts";
import Banners from "../../components/Community/Banners";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Banners />
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
