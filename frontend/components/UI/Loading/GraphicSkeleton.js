import { LineChart } from "react-native-chart-kit";
import { Colors } from "../../../constants/colors";

const STATISTICS = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: () => Colors.humita, // optional
      strokeWidth: 2, // optional
    },
    {
      data: [5, 15, 4, 30, 59, 22],
      color: () => Colors.mJordan,
      strokeWidth: 2, // optional
    },
  ],
};

export default function GraphicSkeleton({ width }) {
  return (
    <LineChart
      data={STATISTICS}
      width={width - 100}
      height={160}
      bezier
      chartConfig={{
        decimalPlaces: 2,
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
    />
  );
}
