import { StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import SectionContainer from "../UI/SectionContainer";
import { Colors } from "../../constants/colors";
import Statistic from "./Statistic";

export default function StatisticsContainer({ data, variables }) {
  return (
    <SectionContainer
      style={styles.container}
      pressedStyle={styles.pressedStyle}
    >
      <TextCommonsMedium style={styles.title}>
        Variable Médica
      </TextCommonsMedium>
      <Statistic initialData={data} variables={variables} />
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingVertical: 18,
    paddingHorizontal: 14,
    gap: 20,
  },

  pressedStyle: {
    opacity: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.mJordan,
  },
});
