import { LineChart } from "react-native-chart-kit";
import { Colors } from "../../../constants/colors";
import { xAxisRotation } from "../../../constants/medicalExams";
import { GlobalStyles } from "../../../constants/styles";

const STATISTICS = {
  labels: ["2019-08", "2020-11", "2021-06", "2022-10", "2023-01", "2024-04"],
  datasets: [
    {
      data: [20, 45, 38, 80, 99, 43],
      color: () => "#ccc", // optional
      strokeWidth: 2, // optional
    },
  ],
};

export default function GraphicSkeleton({ width = 100, height = 100 }) {
  return (
    <LineChart
      data={STATISTICS}
      width={width}
      height={height}
      bezier
      verticalLabelRotation={xAxisRotation}
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
      style={GlobalStyles.graphicStlye}
    />
  );
}
