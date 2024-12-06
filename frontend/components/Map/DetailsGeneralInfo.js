import { StyleSheet, View } from "react-native";
import DetailText from "./DetailText";
import DetailTitle from "./DetailTitle";
import PhonesContainer from "./PhonesContainer";
import StatusIndicator from "./StatusIndicator";

export default function DetailsGeneralInfo({
  address,
  phone,
  optionalPhone,
  isOpen,
}) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.cabeceraContainer}>
        <View>
          <DetailTitle>Ubicación</DetailTitle>
          <DetailText>{address}</DetailText>
        </View>
        <View>
          <StatusIndicator isOpen={isOpen} />
        </View>
      </View>

      <PhonesContainer phone={phone} optionalPhone={optionalPhone} />
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    gap: 14,
  },
  cabeceraContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Ajusta la separación horizontal
    alignItems: "center",
    paddingRight: 50,
  },
});
