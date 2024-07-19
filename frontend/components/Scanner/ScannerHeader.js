import { StyleSheet, View } from "react-native";
import BackButton from "./BackButton";

export default function ScannerHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <BackButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingLeft: 20,
    backgroundColor: "transparent",
  },
});
