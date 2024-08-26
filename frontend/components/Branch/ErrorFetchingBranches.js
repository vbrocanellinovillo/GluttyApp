import { StyleSheet, View } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function ErrorFetchingBranches() {
  return (
    <View style={styles.container}>
      <GluttyErrorScreen width={300} height={300}></GluttyErrorScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});
