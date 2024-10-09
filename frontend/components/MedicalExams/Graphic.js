import { LineChart } from "react-native-chart-kit";
import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import { Colors } from "../../constants/colors";
import { Text } from "react-native";

export default function Graphic({ isLoading = true, data, width }) {
  //if (isLoading) return <GraphicSkeleton />;

  const graph = (
    <LineChart
      data={data}
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

  return <Text>no andan los graficos (despues lo veo)</Text>;
}
