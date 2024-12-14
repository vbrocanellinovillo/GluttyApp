import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import * as Haptics from "expo-haptics";

export default function MapChip({ children, icon, isSelected, onSelect }) {
  function handleSelect() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onSelect();
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={handleSelect}
    >
      <View
        style={[
          styles.chip,
          { backgroundColor: isSelected ? Colors.pielcita : "white" },
        ]}
      >
        <MaterialIcons name={icon} size={20} color={Colors.mJordan} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  chiptText: {
    fontSize: 14,
    fontWeight: "400",
    flexShrink: 1
  },
});
