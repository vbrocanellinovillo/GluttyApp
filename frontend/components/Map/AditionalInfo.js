import ServiceInfo from "./ServiceInfo";
import DetailTitle from "./DetailTitle";
import { View } from "react-native";
import DetailText from "./DetailText";

export default function AditionalInfo({
  separatedKitchen,
  onlyTakeAway,
  description,
  schedule = "FUNCA",
}) {
  return (
    <>
      {schedule && (
        <View>
          <DetailTitle>Horarios del negocio</DetailTitle>
          <DetailText>{schedule}</DetailText>
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
