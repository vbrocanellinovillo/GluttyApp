import { Pressable, StyleSheet } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function MapChip({ children, icon }) {
  console.log(children);
  console.log(icon);
  

  return (
    <Pressable style={styles.chip}>
      <Ionicons name={icon} color={Colors.mJordan} size={24} />
      <TextCommonsRegular>{children}</TextCommonsRegular>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: 12,
    flexDirection: "row",
    padding: 8,
    backgroundColor: "blue"
  },
});
