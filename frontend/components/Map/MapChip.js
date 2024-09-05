import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function MapChip({ children, icon, isSelected, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={onSelect}
    >
      <View
        style={[
          styles.chip,
          { backgroundColor: isSelected ? Colors.pielcita : "white" },
        ]}
      >
        <MaterialIcons name={icon} size={24} color={Colors.mJordan} />
        <TextCommonsMedium style={styles.chiptText}>
          {children}
        </TextCommonsMedium>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pressed: {
    opacity: 0.4,
  },

  chip: {
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  chiptText: {
    fontSize: 18,
  },
});
