import { StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import SectionContainer from "../UI/SectionContainer";
import { useSelector } from "react-redux";

export default function MyStudies({ onPress, number }) {
  return (
    <SectionContainer style={styles.container} onPress={onPress}>
      <TextCommonsMedium style={styles.text}>
        Mis estudios cargados
      </TextCommonsMedium>
      <TextCommonsMedium style={styles.number}>{number}</TextCommonsMedium>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.3,
  },

  pressed: {
    opacity: 0.6,
  },

  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.mJordan,
  },

  number: {
    fontSize: 32,
    fontWeight: "300",
    color: Colors.mJordan,
  },
});
