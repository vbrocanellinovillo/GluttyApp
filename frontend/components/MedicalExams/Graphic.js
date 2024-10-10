import { LineChart } from "react-native-chart-kit";
import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import { Colors } from "../../constants/colors";
import { StyleSheet, View } from "react-native";
import ErrorGraphic from "./ErrorGraphic";
import NoStatistics from "./NoStatistics";

export default function Graphic({ isLoading, isError, data, width, height }) {
  let content;

  if (isLoading) content = <GraphicSkeleton width={width} height={height} />;

  if (isError && !isLoading)
    content = <ErrorGraphic width={width} height={height} />;

  if (!isLoading && !isError && !data) {
    return <NoStatistics width={width} height={height} />;
  }

  if (!isLoading && !isError && data) {
    content = (
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

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
});
