import ServiceInfo from "./ServiceInfo";
import DetailTitle from "./DetailTitle";
import { View } from "react-native";
import DetailText from "./DetailText";

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
        <View>
          <DetailTitle>Horarios del negocio</DetailTitle>
          <DetailText>{schedulesString}</DetailText>
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
          {onlyTakeAway && <ServiceInfo>Solo Take Away</ServiceInfo>}
        </View>
      )}
    </>
  );
}
