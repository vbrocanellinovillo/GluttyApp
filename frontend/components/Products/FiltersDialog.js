import { StyleSheet, View, Text } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Portal, Dialog, Button } from "react-native-paper";
import { Chip } from "@rneui/themed";
import { Colors } from "../../constants/colors";
import FallbackText from "./FallbackText";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

export default function FiltersDialog({
  toggleFilters,
  brands,
  types,
  visible,
  onSearch,
  markedBrands,
  markedTypes,
}) {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    setSelectedBrands(markedBrands ? markedBrands : []);
  }, [markedBrands]);

  useEffect(() => {
    setSelectedTypes(markedTypes ? markedTypes : []);
  }, [markedTypes]);

  function isSelectedBrand(brand) {
    return selectedBrands.includes(brand);
  }

  function isSelectedType(type) {
    return selectedTypes.includes(type);
  }

  function selectBrand(pressedBrand) {
    Haptics.selectionAsync();
    if (isSelectedBrand(pressedBrand)) {
      setSelectedBrands((prevBrands) =>
        prevBrands.filter((brand) => brand !== pressedBrand)
      );
    } else {
      setSelectedBrands([...selectedBrands, pressedBrand]);
    }
  }

  function selectType(pressedType) {
    Haptics.selectionAsync();
    if (isSelectedType(pressedType)) {
      setSelectedTypes((prevTypes) =>
        prevTypes.filter((type) => type !== pressedType)
      );
    } else {
      setSelectedTypes([...selectedTypes, pressedType]);
    }
  }

  let brandsContent = <FallbackText>No se encontraron marcas</FallbackText>;
  let typesContent = (
    <FallbackText>No se encontraron tipos de producto</FallbackText>
  );

  if (brands.length > 0) {
    brandsContent = brands.map((brand) => (
      <Chip
        key={brand.id}
        type="outlined"
        title={brand.nombre}
        containerStyle={
          isSelectedBrand(brand.nombre)
            ? [styles.chip, styles.selected]
            : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => selectBrand(brand.nombre)}
        icon={
          isSelectedBrand(brand.nombre) && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
    ));
  }

  if (types.length > 0) {
    typesContent = types.map((type) => (
      <Chip
        key={type.id}
        type="outlined"
        title={type.nombre}
        containerStyle={
          isSelectedType(type.nombre)
            ? [styles.chip, styles.selected]
            : styles.chip
        }
        titleStyle={styles.chipText}
        onPress={() => selectType(type.nombre)}
        icon={
          isSelectedType(type.nombre) && {
            name: "close",
            type: "ionicon",
          }
        }
        iconRight
        iconContainerStyle={styles.chipIcon}
      />
    ));
  }

  function submitSearch() {
    onSearch(selectedBrands, selectedTypes);
    toggleFilters();
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={toggleFilters}
        style={styles.filtersDialog}
      >
        <Dialog.Title style={styles.title}>
          <TextCommonsMedium>Filtros</TextCommonsMedium>
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.field}>
            <TextCommonsRegular style={styles.subtitle}>
              Tipo Producto
            </TextCommonsRegular>
            <View style={styles.chipsContainer}>{typesContent}</View>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>
              <TextCommonsRegular>Marca</TextCommonsRegular>
            </Text>
            <View style={styles.chipsContainer}>{brandsContent}</View>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              onPress={submitSearch}
              buttonColor={Colors.uva}
              textColor="white"
            >
              Buscar
            </Button>
            <Button
              mode="outlined"
              onPress={toggleFilters}
              style={{ borderColor: Colors.uva }}
              textColor={Colors.uva}
            >
              Cancelar
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  filtersDialog: {
    backgroundColor: Colors.pielcita,
    borderRadius: 12,
  },

  title: {
    color: Colors.mJordan,
    fontSize: 30,
  },

  subtitle: {
    color: Colors.mJordan,
    fontSize: 25,
    marginBottom: 6,
  },

  field: {
    marginVertical: 10,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },

  chip: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.3,
  },

  chipText: {
    fontSize: 14,
    color: "black",
    fontWeight: "400",
  },

  selected: {
    borderWidth: 1,
  },

  chipIcon: {
    height: 20,
    top: "-2%",
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 17,
  },
});
