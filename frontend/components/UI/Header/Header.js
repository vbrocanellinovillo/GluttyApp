import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { GlobalStyles } from "../../../constants/styles";

export default function Header({ children }) {
  const blurHeader = useSelector((state) => state.ui.blurHeader);

  return (
    <>
      <View style={styles.header}>{children}</View>
      {blurHeader && <BlurView style={GlobalStyles.blur} intensity={1} />}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
