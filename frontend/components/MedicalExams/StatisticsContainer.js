import { StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import SectionContainer from "../UI/SectionContainer";
import { Colors } from "../../constants/colors";
import { LineChart } from "react-native-chart-kit";

export default function StatisticsContainer({ data }) {
  return (
    <SectionContainer
      style={styles.container}
      pressedStyle={styles.pressedStyle}
    >
      <TextCommonsMedium style={styles.title}>
        Variable Médica
      </TextCommonsMedium>
      <LineChart
        data={data}
        width={320} // from react-native
        height={180}
        chartConfig={{
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => Colors.mJordan,
          labelColor: () => Colors.mJordan,
          style: {},
          propsForDots: {
            r: "6",
          },
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          fillShadowGradientFrom: Colors.mJordan,
          fillShadowGradientTo: Colors.pielcita,
          backgroundGradientFromOpacity: 1,
          fillShadowGradientToOpacity: 0.8,
          propsForBackgroundLines: {
            display: "none",
          },
        }}
        bezier
      />
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },

  pressedStyle: {
    opacity: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.mJordan,
  },
});
