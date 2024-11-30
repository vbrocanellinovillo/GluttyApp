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
    ];
    handleSelects = [handleSelectBrand, handleSelectBrand];
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
            size: 18,
            color: Colors.mJordan,
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
            size: 18,
            color: Colors.mJordan,
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
      <TouchableOpacity onPress={toggleFiltersDialog}>
        <Ionicons name="filter" size={22} color={Colors.mJordan} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 12,
    paddingBottom: 22,
    gap: 15,
  },

  chip: {
    paddingHorizontal: 8,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 22,
    borderWidth: 0.9,
    height: 51,
    justifyContent: "center",
    marginLeft: 10,
  },

  chipText: {
    fontSize: 10, // Ajustado para mejor legibilidad
    fontWeight: "",
    color: Colors.mJordan,
  },

  selected: {
    backgroundColor: Colors.pielcita,
  },

  chipIcon: {
    marginLeft: 4, // Asegura un pequeño espacio entre el texto y el ícono
  },
});
