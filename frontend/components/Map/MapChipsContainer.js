import { StyleSheet, View } from "react-native";
import MapChip from "./MapChip";
import { useState } from "react";
import * as Haptics from "expo-haptics";

export default function MapChipsContainer({
  separatedKitchen,
  onlyTakeAway,
  toggleSeparatedKitchen,
  toggleOnlyTakeAway,
}) {
  return (
    <View style={styles.container}>
      <MapChip
        icon="restaurant"
        isSelected={separatedKitchen}
        onSelect={toggleSeparatedKitchen}
      >
        Cocina Separada
      </MapChip>
      <MapChip
        icon="delivery-dining"
        isSelected={onlyTakeAway}
        onSelect={toggleOnlyTakeAway}
      >
        Sólo TakeAway
      </MapChip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginTop: -14,
    marginBottom: 20,
    alignItems: "center"
  },
});
