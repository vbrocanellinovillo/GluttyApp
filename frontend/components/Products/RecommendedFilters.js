import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Chip } from "@rneui/themed";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function RecommendedFilters({
  brand,
  type,
  isSelectedBrand,
  isSelectedType,
  handleSelectBrand,
  handleSelectType,
  toggleFilters,
  onPressFilter,
}) {
  const selectedBrand = isSelectedBrand(brand);
  const selectedType = isSelectedType(type);

  function toggleFiltersDialog() {
    Haptics.selectionAsync();
    toggleFilters();
  }

  return (
    <View style={styles.filtersContainer}>
      <Chip
        title={brand.name}
        type="outlined"
        containerStyle={
          selectedBrand ? [styles.chip, styles.selected] : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => {
          handleSelectBrand(brand);
          onPressFilter();
        }}
        icon={
          selectedBrand && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
      <Chip
        title={type.name}
        type="outlined"
        containerStyle={
          selectedType ? [styles.chip, styles.selected] : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => {
          handleSelectType(type);
          onPressFilter();
        }}
        icon={
          selectedType && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
      <TouchableOpacity onPress={toggleFiltersDialog}>
        <Ionicons name="filter" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 22,
    gap: 24,
  },

  chip: {
    paddingHorizontal: 18,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.3,
  },

  chipText: {
    fontSize: 16,
    color: "black",
  },

  selected: {
    backgroundColor: Colors.pielcita,
  },

  chipIcon: {
    height: 20,
    top: "-2%",
  },
});
