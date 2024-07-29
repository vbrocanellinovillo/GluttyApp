import { StyleSheet } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import DetailContainer from "./DetailContainer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function NotFoundProduct({ error }) {
  return (
    <DetailContainer style={styles.container}>
      <MaterialCommunityIcons
        name="magnify-remove-outline"
        size={60}
        color={Colors.mJordan}
      />
      <TextCommonsRegular style={styles.text}>{error}</TextCommonsRegular>
    </DetailContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingBottom: 40,
  },

  text: {
    fontSize: 22,
    color: Colors.mJordan,
    textAlign: "center",
  },
});
