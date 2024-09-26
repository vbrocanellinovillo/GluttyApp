import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function MedicalValue({ label, value, min, max }) {
  function calculatePosition() {
    const valuePercentage = (value - min) / (max - min); // Normalizar el valor
    const barWidth = 300; // Ancho de la barra
    const padding = 18; // Padding horizontal
    return padding + valuePercentage * (barWidth - padding * 2); // Ajustar posición
  }

  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.title}>{label}</TextCommonsMedium>
      <View style={styles.generalBar}>
        <View style={styles.valueBar}>
          <TextCommonsRegular style={styles.range}>{min}</TextCommonsRegular>
          <View style={[styles.valueContainer, { left: calculatePosition() }]}>
            <TextCommonsMedium style={styles.value}>{value}</TextCommonsMedium>
          </View>
          <TextCommonsRegular style={styles.range}>{max}</TextCommonsRegular>
        </View>
      </View>
    </View>
  );
}

const height = 30;

const styles = StyleSheet.create({
  container: {
    gap: 38,
  },

  generalBar: {
    backgroundColor: "#eee",
    height: height,
    alignItems: "center",
    borderRadius: 20,
  },

  valueBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.oceanBlue,
    height: height,
    width: 300,
    borderRadius: 20,
    paddingHorizontal: 18,
    position: "relative",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  range: {
    fontSize: 16,
    color: "#333",
  },

  valueContainer: {
    width: 5,
    height: "100%",
    backgroundColor: Colors.humita,
    position: "absolute",
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: -10,
    marginTop: -20,
    color: Colors.mJordan,
  },
});
