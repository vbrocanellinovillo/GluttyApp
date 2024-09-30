import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Picker from "../UI/Controls/Picker";
import { Colors } from "../../constants/colors";
import Frequencies from "./Frequencies";
import Frequency from "./Frequency";

const FREQUENCIES = [
  { id: 1, value: "Año" },
  { id: 2, value: "Semestre" },
  { id: 3, value: "Trimestre" },
  { id: 4, value: "Mes" },
];

const width = Dimensions.get("window").width;

export default function Statistic({ initialData, variables }) {
  const [data, setData] = useState(initialData);
  const [frequency, setFrecuency] = useState(1);

  function selectFrequency(id) {
    setFrecuency(id);
  }

  const initialValue = variables && variables[0].value;

  return (
    <>
      <Picker data={variables} value={initialValue} />
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
      <Frequencies>
        {FREQUENCIES.map((freq) => (
          <Frequency
            key={freq.id}
            id={freq.id}
            onSelect={selectFrequency}
            isSelected={freq.id === frequency}
          >
            {freq.value}
          </Frequency>
        ))}
      </Frequencies>
    </>
  );
}

const styles = StyleSheet.create({});
