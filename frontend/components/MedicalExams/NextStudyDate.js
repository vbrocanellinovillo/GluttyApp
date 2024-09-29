import { StyleSheet, View } from "react-native";
import NextStudyDateItem from "./NextStudyDateItem";

export default function NextStudyDate({ year, month, days }) {
  return (
    <View style={styles.container}>
      <NextStudyDateItem number={year} text="Años" />
      <NextStudyDateItem number={month} text="Meses" />
      <NextStudyDateItem number={days} text="Dias" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 14,
  },
});
