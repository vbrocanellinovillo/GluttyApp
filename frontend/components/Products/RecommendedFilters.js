import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Chip } from "@rneui/themed";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function RecommendedFilters({
  brand,
  type,
  isSelectedBrand,
  isSelectedType,
  handleSelectBrand,
  handleSelectType,
  toggleFilters,
  refetch
}) {
  const selectedBrand = isSelectedBrand(brand);
  const selectedType = isSelectedType(type);

  async function selectBrand() {
    handleSelectBrand(brand);
    await refetch();
  }

  async function selectType() {
    handleSelectType(type);
    await refetch();
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
        onPress={selectBrand}
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
        onPress={selectType}
        icon={
          selectedType && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
      <TouchableOpacity onPress={toggleFilters}>
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
