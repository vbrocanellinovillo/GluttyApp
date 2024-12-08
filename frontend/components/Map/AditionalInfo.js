import ServiceInfo from "./ServiceInfo";
import DetailTitle from "./DetailTitle";
import { StyleSheet, View } from "react-native";
import DetailText from "./DetailText";
import StatusIndicator from "./StatusIndicator";

export default function AditionalInfo({
  separatedKitchen,
  onlyTakeAway,
  description,
  schedule,
}) {
  const schedulesString = schedule
    .map((horario) => {
      const minTime = horario.min_time.slice(0, 5); // Quita los segundos
      const maxTime = horario.max_time.slice(0, 5); // Quita los segundos
      return `${horario.day} - ${minTime} a ${maxTime}`;
    })
    .join("\n"); // Une las cadenas con un salto de línea

  return (
    <>
      {schedulesString && (
        <View style={styles.row}>
          <View>
            <DetailTitle>Horarios del negocio</DetailTitle>
            <DetailText>{schedulesString}</DetailText>
          </View>
          <StatusIndicator isOpen={true} />
        </View>
      )}
      {description && (
        <View>
          <DetailTitle>Descripción</DetailTitle>
          <DetailText>{description}</DetailText>
        </View>
      )}
      {(separatedKitchen || onlyTakeAway) && (
        <View>
          <DetailTitle>Información adicional</DetailTitle>
          {separatedKitchen && <ServiceInfo>Cocina separada</ServiceInfo>}
          {onlyTakeAway && <ServiceInfo>Sólo Take Away</ServiceInfo>}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
