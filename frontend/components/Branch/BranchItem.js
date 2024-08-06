import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function BranchItem({ name, address }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.item, styles.pressed] : styles.item
      }
    >
      <View style={styles.detailsContainer}>
        <Ionicons name="storefront" size={22} color={Colors.mJordan} />
        <View style={styles.textContainer}>
          <TextCommonsMedium style={styles.name}>{name}</TextCommonsMedium>
          <TextCommonsRegular style={styles.address}>
            {address}
          </TextCommonsRegular>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="chevron-forward" size={25} color={Colors.mJordan} />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#222",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "white",
    padding: 20,
  },

  pressed: {
    opacity: 0.6,
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  textContainer: {
    gap: 7,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  address: {
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "italic",
    color: Colors.mJordan,
  },
});
