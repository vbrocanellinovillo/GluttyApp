import { Dimensions, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import SectionContainer from "../UI/SectionContainer";
import { Colors } from "../../constants/colors";
import Statistic from "./Statistic";
import NoStatistics from "./NoStatistics";
import {
  heightGraphicPercentage,
  widthGraphicPercentage,
} from "../../constants/medicalExams";

const width = Dimensions.get("window").width * widthGraphicPercentage;
const height = Dimensions.get("window").height * heightGraphicPercentage;

export default function StatisticsContainer({ initialData, variables }) {
  return (
    <>
      {initialData && variables ? (
        <SectionContainer
          style={styles.container}
          pressedStyle={styles.pressedStyle}
        >
          <TextCommonsMedium style={styles.title}>
            Variable Médica
          </TextCommonsMedium>
          <Statistic
            initialData={initialData}
            variables={variables}
            width={width}
            height={height}
          />
        </SectionContainer>
      ) : (
        <NoStatistics width={width} height={height} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingVertical: 12,
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
