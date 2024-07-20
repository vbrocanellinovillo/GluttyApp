import { View, StyleSheet } from "react-native";
import ScannerOverlay from "./ScannerOverlay";

export default function NoPermissions() {
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <ScannerOverlay color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "black",
  },
});
