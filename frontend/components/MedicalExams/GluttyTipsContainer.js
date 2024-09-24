import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import TipsCarousel from "./TipsCarousel";

export default function GluttyTipsContainer({ onDismiss, tips }) {
  return (
    <View style={styles.backdropContainer}>
      <Pressable style={styles.backdrop} onPress={onDismiss} />
      <View style={styles.tipsContainer}>
        <View style={styles.header}>
          <TextCommonsMedium style={styles.title}>
            Glutty Tips
          </TextCommonsMedium>
          <TouchableOpacity onPress={onDismiss}>
            <Ionicons name="close" color={Colors.mJordan} size={28} />
          </TouchableOpacity>
        </View>

        <TipsCarousel tips={tips} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdropContainer: {
    flex: 1,
    paddingVertical: 110,
    paddingHorizontal: 30,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    flex: 1,
  },

  tipsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 50,
    shadowColor: "black",
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
