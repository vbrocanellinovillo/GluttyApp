import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Picker from "../UI/Controls/Picker";
import { Colors } from "../../constants/colors";
import Frequencies from "./Frequencies";
import Frequency from "./Frequency";
import { useSelector } from "react-redux";
import { getStatistics } from "../../services/medicalExamService";

const FREQUENCIES = [
  { id: 1, value: "3 años" },
  { id: 2, value: "1 año" },
  { id: 3, value: "6 meses" },
  { id: 4, value: "3 meses" },
];

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
  legend: ["Glucosa", "Minimos"], // optional
};

const width = Dimensions.get("window").width;

export default function Statistic({ initialData, variables }) {
  const [data, setData] = useState(initialData);

  const [frequency, setFrecuency] = useState(FREQUENCIES[0].value);
  const [variable, setVariable] = useState(variables && variables[0].value);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    getStatisticsData();
  }, [variable, frequency]);

  async function getStatisticsData() {
    try {
      const response = await getStatistics(token, variable, frequency);
    } catch (error) {}
  }

  function selectFrequency(frequency) {
    setFrecuency(frequency);
  }

  function selectVariable(option) {
    setVariable(option);
  }

  return (
    <>
      <Picker
        data={variables}
        value={variable}
        confirmButton
        buttonStyle={styles.buttonStyle}
        onPressButton={selectVariable}
      />
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
            isSelected={freq.value === frequency}
          >
            {freq.value}
          </Frequency>
        ))}
      </Frequencies>
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.humita,
  },
});
