import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Chip } from "@rneui/themed";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import FiltersSkeleton from "../UI/Loading/FiltersSkeleton";

export function getRecommendedChips(
  brands,
  types,
  isSelectedBrand,
  isSelectedType,
  handleSelectBrand,
  handleSelectType
) {
  const existsBrands = brands.length > 0;
  const existsTypes = types.length > 0;

  let recommendedChips = [];
  let selectedChips = [];
  let handleSelects = [];

  if (existsBrands && existsTypes) {
    recommendedChips = [brands[0], types[0]];
    selectedChips = [
      isSelectedBrand(recommendedChips[0]),
      isSelectedType(recommendedChips[1]),
    ];
    handleSelects = [handleSelectBrand, handleSelectType];
  } else if (!existsBrands) {
    recommendedChips = [types[0], types[1]];
    selectedChips = [
      isSelectedType(recommendedChips[0]),
      isSelectedType(recommendedChips[1]),
    ];
    handleSelects = [handleSelectType, handleSelectType];
  } else {
    recommendedChips = [brands[0], brands[1]];
    selectedChips = [
      isSelectedBrand(recommendedChips[0]),
      isSelectedBrand(recommendedChips[1]),
      (handleSelects = [handleSelectBrand, handleSelectBrand]),
    ];
  }

  return { recommendedChips, selectedChips, handleSelects };
}

export default function RecommendedFilters({
  brands,
  types,
  isSelectedBrand,
  isSelectedType,
  handleSelectBrand,
  handleSelectType,
  toggleFilters,
  isLoadingInitialFilters,
}) {
  if (isLoadingInitialFilters) return <FiltersSkeleton />;

  const { recommendedChips, selectedChips, handleSelects } =
    getRecommendedChips(
      brands,
      types,
      isSelectedBrand,
      isSelectedType,
      handleSelectBrand,
      handleSelectType
    );

  function toggleFiltersDialog() {
    Haptics.selectionAsync();
    toggleFilters();
  }

  return (
    <View style={styles.filtersContainer}>
      <Chip
        title={recommendedChips[0]}
        type="outlined"
        containerStyle={
          selectedChips[0] ? [styles.chip, styles.selected] : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => {
          handleSelects[0](recommendedChips[0]);
        }}
        icon={
          selectedChips[0] && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
      <Chip
        title={recommendedChips[1]}
        type="outlined"
        containerStyle={
          selectedChips[1] ? [styles.chip, styles.selected] : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => {
          handleSelects[1](recommendedChips[1]);
        }}
        icon={
          selectedChips[1] && {
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
    height: 50,
    justifyContent: "center",
  },

  chipText: {
    fontSize: 12,
    color: Colors.mJordan,
  },

  selected: {
    backgroundColor: Colors.pielcita,
  },

  chipIcon: {
    height: 20,
    top: "-2%",
  },
});
