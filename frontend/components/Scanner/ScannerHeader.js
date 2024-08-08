import { StyleSheet, View } from "react-native";
import BackButton from "./BackButton";
import FindProductsButton from "./FindProductsButton";

export default function ScannerHeader({ navigation }) {
  return (
    <View style={styles.header}>
      <BackButton navigation={navigation} />
      <FindProductsButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
