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

const width = Dimensions.get("window").width * 0.85;
const height = Dimensions.get("window").height * 0.2;

function getGraphicData(values) {
  if (!values) return;

  const graphic = {
    labels: values.labels,
    datasets: [
      {
        data: values.values,
        color: () => Colors.humita,
        strokeWidth: 2,
      },
      {
        data: values.maxs,
        color: () => Colors.mJordan,
        strokeWidth: 2,
      },
      {
        data: values.mins,
        color: () => Colors.mJordan,
        strokeWidth: 2,
      },
    ],
  };

  return graphic;
}

export default function Statistic({ variables, initialData }) {
  const [data, setData] = useState(initialData && getGraphicData(initialData));
  const [fistLoading, setFirstLoading] = useState(false);

  const [frequency, setFrecuency] = useState(FREQUENCIES[0].value);
  const [variable, setVariable] = useState(variables && variables[0].value);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!fistLoading) {
      getStatisticsData();
    } else {
      setFirstLoading(true);
    }
  }, [variable, frequency]);

  async function getStatisticsData() {
    setIsLoading(true);
    try {
      const response = await getStatistics(token, variable, frequency);
      const graphic = getGraphicData(response);
      setData(graphic);
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
    <>
      <Picker
        data={variables}
        value={variable}
        confirmButton
        buttonStyle={styles.buttonStyle}
        onPressButton={selectVariable}
      />
      {data && (
        <Graphic
          data={data}
          width={width}
          height={height}
          isLoading={isLoading}
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
    </>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.humita,
  },
});
