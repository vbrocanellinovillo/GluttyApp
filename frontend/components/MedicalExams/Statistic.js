import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Picker from "../UI/Controls/Picker";
import { Colors } from "../../constants/colors";
import Frequencies from "./Frequencies";
import Frequency from "./Frequency";

const options = [
  {
    value: 1,
    label: "Ig A anti Transglutaminasa",
  },
  {
    value: 2,
    label: "Ig G anti Gliadina Deaminada",
  },
  {
    value: 3,
    label: "Hemoglobina",
  },
  {
    value: 4,
    label: "Glucosa",
  },
];

const FREQUENCIES = [
  { id: 1, value: "Año" },
  { id: 2, value: "Semestre" },
  { id: 3, value: "Trimestre" },
  { id: 4, value: "Mes" },
];

export default function Statistic({ initialData }) {
  const [data, setData] = useState(initialData);
  const [frequency, setFrecuency] = useState(1);

  function selectFrequency(id) {
    setFrecuency(id);
  }

  return (
    <View style={styles.container}>
      <Picker data={options} />
      <LineChart
        data={data}
        width={320}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
});
