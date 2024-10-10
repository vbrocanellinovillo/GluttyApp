import { LineChart } from "react-native-chart-kit";
import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import { Colors } from "../../constants/colors";

export default function Graphic({ isLoading, data, width, height }) {
  if (isLoading) return <GraphicSkeleton width={width} height={height} />;

  return (
    <LineChart
      data={data}
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
