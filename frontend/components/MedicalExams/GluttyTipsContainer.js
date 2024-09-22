import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function GluttyTipsContainer({ onDismiss }) {
  return (
    <Pressable style={styles.container} onPress={onDismiss}>
      <View style={styles.tipsContainer}>
        
        <View style={styles.header}>
          <TextCommonsMedium style={styles.title}>
            Glutty Tips
          </TextCommonsMedium>
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" color={Colors.mJordan} size={26} />
          </TouchableOpacity>
        </View>

      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 110,
    paddingHorizontal: 30,
  },

  tipsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 12
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 21,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
