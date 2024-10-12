import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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

function getGraphicData(values) {
  if (!values) return;

  const graphic = {
    labels: values.labels,
    datasets: [
      {
        data: values?.values.map((value) => (isNaN(value) ? 0 : value)),
        color: () => Colors.humita,
        strokeWidth: 2,
      },
      {
        data: values.maxs.map((value) => (isNaN(value) ? 0 : value)),
        color: () => Colors.mJordan,
        strokeWidth: 2,
      },
      {
        data: values.mins.map((value) => (isNaN(value) ? 0 : value)),
        color: () => Colors.mJordan,
        strokeWidth: 2,
      },
    ],
  };

  return graphic;
}

export default function Statistic({ variables, initialData, width, height }) {
  const [data, setData] = useState(initialData && getGraphicData(initialData));
  const [fistLoading, setFirstLoading] = useState(true);

  const [frequency, setFrecuency] = useState(FREQUENCIES[0].value);
  const [variable, setVariable] = useState(variables && variables[0].value);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (fistLoading) {
      setFirstLoading(false);
    } else {
      getStatisticsData();
    }
  }, [variable, frequency]);

  async function getStatisticsData() {
    setIsLoading(true);
    try {
      const response = await getStatistics(token, variable, frequency);
      const graphic = getGraphicData(response);
      setData(graphic);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function selectFrequency(frequency) {
    setFrecuency(frequency);
  }

  function selectVariable(option) {
    setVariable(option);
  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          data={variables}
          value={variable}
          confirmButton
          buttonStyle={styles.buttonStyle}
          onPressButton={selectVariable}
        />
      </View>
      {data && (
        <Graphic
          data={data}
          width={width}
          height={height}
          isLoading={isLoading}
          isError={isError}
        />
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  buttonStyle: {
    backgroundColor: Colors.humita,
  },

  pickerContainer: {
    marginBottom: 20,
  },
});
