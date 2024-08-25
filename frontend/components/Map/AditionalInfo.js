import ServiceInfo from "./ServiceInfo";
import DetailTitle from "./DetailTitle";
import { View } from "react-native";

export default function AditionalInfo({ separatedKitchen, onlyTakeAway }) {
  return (
    <>
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
