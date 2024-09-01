import { StyleSheet, View } from "react-native";
import MapChip from "./MapChip";
import { useState } from "react";
import * as Haptics from "expo-haptics";

export default function MapChipsContainer({ chips }) {
  const [filters, setFilters] = useState([]);

  function isSelectedChip(chip) {
    return filters.includes(chip);
  }

  function handleSelectChip(pressedChip) {
    Haptics.selectionAsync();
    if (isSelectedChip(pressedChip)) {
      setFilters((prevChips) =>
        prevChips.filter((chip) => chip !== pressedChip)
      );
    } else {
      setFilters([...filters, pressedChip]);
    }
  }

  return (
    <View style={styles.container}>
      {chips.map((chip) => (
        <MapChip
          key={chip.id}
          chip={chip}
          isSelected={isSelectedChip}
          onSelect={handleSelectChip}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: -14,
    marginBottom: 20,
  },
});
