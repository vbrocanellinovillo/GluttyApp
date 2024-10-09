import { LineChart } from "react-native-chart-kit";
import { Colors } from "../../../constants/colors";

const STATISTICS = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      data: [20, 45, 38, 80, 99, 43],
      color: () => "#ccc", // optional
      strokeWidth: 2, // optional
    },
  ],
};

export default function GraphicSkeleton({
  width = 100,
  height = 100,
}) {
  return (
    <LineChart
      data={STATISTICS}
      width={width}
      height={height}
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
        fillShadowGradientFrom: "#eee",
        fillShadowGradientTo: "#ddd",
        backgroundGradientFromOpacity: 1,
        fillShadowGradientToOpacity: 0.8,
        propsForBackgroundLines: {
          display: "none",
        },
      }}
    />
  );
}
