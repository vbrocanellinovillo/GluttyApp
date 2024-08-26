import { View, StyleSheet } from "react-native";
import DetailText from "./DetailText";
import DetailTitle from "./DetailTitle";

export default function PhonesContainer({ phone, optionalPhone }) {
  return (
    <View style={styles.phonesContainer}>
      <View>
        <DetailTitle>Telefono</DetailTitle>
        <DetailText>{phone}</DetailText>
      </View>
      {optionalPhone && (
        <View>
          <DetailTitle>Otro telefono</DetailTitle>
          <DetailText>{optionalPhone}</DetailText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  phonesContainer: {
    flexDirection: "row",
    gap: 120,
  },
});
