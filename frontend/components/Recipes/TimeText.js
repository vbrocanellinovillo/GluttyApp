import { StyleSheet } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function TimeText({ isAnswer, children }) {
  return (
    <TextCommonsRegular
      style={[styles.timeText, { marginRight: isAnswer ? 55 : 18 }]}
    >
      {children}
    </TextCommonsRegular>
  );
}

const styles = StyleSheet.create({
  timeText: {
    textAlign: "right",
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
});
