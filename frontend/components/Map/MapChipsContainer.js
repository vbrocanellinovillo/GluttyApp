import { StyleSheet, View } from "react-native";
import MapChip from "./MapChip";

export default function MapChipsContainer({ chips }) {
  return (
    <View style={styles.container}>
      {chips.map((chip) => (
        <MapChip icon={chip.icon} key={chip.id}>
          {chip.name}
        </MapChip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: -14,
    marginBottom: 20
  },
});
