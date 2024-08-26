import { StyleSheet, View } from "react-native";
import DetailText from "./DetailText";
import DetailTitle from "./DetailTitle";
import PhonesContainer from "./PhonesContainer";

export default function DetailsGeneralInfo({ address, phone, optionalPhone }) {
  return (
    <View style={styles.infoContainer}>
      <View>
        <DetailTitle>Ubicación</DetailTitle>
        <DetailText>{address}</DetailText>
      </View>
      <PhonesContainer phone={phone} optionalPhone={optionalPhone} />
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    gap: 16,
  },
});
