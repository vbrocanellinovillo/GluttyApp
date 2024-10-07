import { StyleSheet, TouchableOpacity } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function Frequency({ children, onSelect, isSelected }) {
  function handlePress() {
    Haptics.selectionAsync();
    onSelect(children);
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSelected ? Colors.pielcita : "#eee" },
      ]}
      onPress={handlePress}
    >
      <TextCommonsRegular style={styles.text}>{children}</TextCommonsRegular>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  text: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
