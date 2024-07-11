import { StyleSheet, View, Text } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Portal, Dialog } from "react-native-paper";
import { Chip } from "@rneui/themed";
import { Colors } from "../../constants/colors";

export default function FiltersDialog({
  brands,
  types,
  handleSelectBrand,
  handleSelectType,
  toggleFilters,
  visible,
  isSelectedBrand,
  isSelectedType,
}) {
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
            <View style={styles.chipsContainer}>
              {types.map((type) => (
                <Chip
                  key={type.id}
                  type="outlined"
                  title={type.name}
                  containerStyle={
                    isSelectedType(type)
                      ? [styles.chip, styles.selected]
                      : styles.chip
                  }
                  titleStyle={styles.chipText}
                  onPress={() => handleSelectType(type)}
                  icon={
                    isSelectedType(type) && {
                      name: "close",
                      type: "ionicon",
                    }
                  }
                  iconRight
                  iconContainerStyle={styles.chipIcon}
                />
              ))}
            </View>
          </View>
          <View style={styles.field}>
            <Text style={styles.subtitle}>
              <TextCommonsRegular>Marca</TextCommonsRegular>
            </Text>
            <View style={styles.chipsContainer}>
              {brands.map((brand) => (
                <Chip
                  key={brand.id}
                  type="outlined"
                  title={brand.name}
                  containerStyle={
                    isSelectedBrand(brand)
                      ? [styles.chip, styles.selected]
                      : styles.chip
                  }
                  titleStyle={styles.chipText}
                  onPress={() => handleSelectBrand(brand)}
                  icon={
                    isSelectedBrand(brand) && {
                      name: "close",
                      type: "ionicon",
                    }
                  }
                  iconRight
                  iconContainerStyle={styles.chipIcon}
                />
              ))}
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions></Dialog.Actions>
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
    marginBottom: 6
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
    fontSize: 16,
    color: "black",
  },

  selected: {
    borderWidth: 1,
  },

  chipIcon: {
    height: 20,
    top: "-2%",
  },
});
