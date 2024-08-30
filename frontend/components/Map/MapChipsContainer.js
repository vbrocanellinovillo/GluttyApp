import { StyleSheet, View } from "react-native";
import MapChip from "./MapChip";

export default function MapChipsContainer({ chips }) {
  return (
    <View style={styles.container}>
      {chips.map((chip) => {
        <MapChip key={chip.id} icon={chip.icon}>
          {chip.name}
        </MapChip>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
  },
});
