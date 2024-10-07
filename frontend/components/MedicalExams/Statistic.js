import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Picker from "../UI/Controls/Picker";
import { Colors } from "../../constants/colors";
import Frequencies from "./Frequencies";
import Frequency from "./Frequency";
import { useSelector } from "react-redux";
import { getStatistics } from "../../services/medicalExamService";
import Graphic from "./Graphic";

const FREQUENCIES = [
  { id: 1, value: "3 años" },
  { id: 2, value: "1 año" },
  { id: 3, value: "6 meses" },
  { id: 4, value: "3 meses" },
];

const width = Dimensions.get("window").width;

export default function Statistic({ variables }) {
  const [data, setData] = useState();

  const [frequency, setFrecuency] = useState(FREQUENCIES[0].value);
  const [variable, setVariable] = useState(variables && variables[0].value);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    getStatisticsData();
  }, [variable, frequency]);

  async function getStatisticsData() {
    try {
      const response = await getStatistics(token, variable, frequency);

      const graphic = {
        labels: response.labels,
        datasets: [
          {
            data: response.values,
            color: () => Colors.humita,
            strokeWidth: 2,
          },
          {
            data: response.maxs,
            color: () => Colors.mJordan,
            strokeWidth: 2,
          },
          {
            data: response.mins,
            color: () => Colors.mJordan,
            strokeWidth: 2,
          },
        ],
      };

      setData(graphic);
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
      {data && <Graphic data={data} width={width} />}
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
