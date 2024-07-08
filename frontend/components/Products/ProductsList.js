import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import ProductItem from "./ProductItem";
import Searchbar from "../UI/Controls/Searchbar";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import ProductsSkeleton from "../UI/Loading/ProductsSkeleton";
import { Ionicons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import { Dialog, Portal } from "react-native-paper";
import { Text } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm === "") {
        setData(undefined);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const products = await fetchProducts(searchTerm);
        setData(products);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  function handleChange(text) {
    setSearchTerm(text);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  function handleSelectBrand(pressedBrand) {
    if (brands.includes(pressedBrand)) {
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand !== pressedBrand)
      );
    } else {
      setBrands([...brands, pressedBrand]);
    }
  }

  function handleSelectType(pressedType) {
    if (productTypes.includes(pressedType)) {
      setProductTypes((prevTypes) =>
        prevTypes.filter((type) => type !== pressedType)
      );
    } else {
      setProductTypes([...productTypes, pressedType]);
    }
  }

  let content = (
    <View style={styles.gluttyContainer}>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1720213929/Glutty_haciendo_dedo_mucza1.webp",
        }}
        style={styles.image}
      />
    </View>
  );

  if (isLoading) content = <ProductsSkeleton />;

  if (data)
    content = (
      <>
        <View style={styles.filtersContainer}>
          <Chip
            title={data.brands[0].name}
            type="outlined"
            containerStyle={
              brands.includes(data.brands[0])
                ? [styles.chip, styles.selectedRecomended]
                : styles.chip
            }
            titleStyle={styles.chipText}
            onPress={() => handleSelectBrand(data.brands[0])}
            icon={
              brands.includes(data.brands[0]) && {
                name: "close",
                type: "ionicon",
              }
            }
            iconRight
          />
          <Chip
            title={data.types[0].name}
            type="outlined"
            containerStyle={
              productTypes.includes(data.types[0])
                ? [styles.chip, styles.selectedRecomended]
                : styles.chip
            }
            titleStyle={styles.chipText}
            onPress={() => handleSelectType(data.types[0])}
            icon={
              productTypes.includes(data.types[0]) && {
                name: "close",
                type: "ionicon",
              }
            }
            iconRight
          />
          <TouchableOpacity onPress={toggleFilters}>
            <Ionicons name="filter" size={24} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={data.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem product={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Portal>
          <Dialog
            visible={showFilters}
            onDismiss={toggleFilters}
            style={styles.filtersDialog}
          >
            <Dialog.Title style={styles.title}>
              <TextCommonsMedium>Filtros</TextCommonsMedium>
            </Dialog.Title>
            <Dialog.Content>
              <View style={styles.field}>
                <Text style={styles.subtitle}>
                  <TextCommonsRegular>Tipo Producto</TextCommonsRegular>
                </Text>
                <View style={styles.chipsContainer}>
                  {data.types.slice(0, 7).map((type) => (
                    <Chip
                      key={type.id}
                      type="outlined"
                      title={type.name}
                      containerStyle={
                        productTypes.includes(type)
                          ? [styles.chipDialog, styles.selectedDialog]
                          : styles.chipDialog
                      }
                      titleStyle={styles.chipText}
                      onPress={() => handleSelectType(type)}
                      icon={
                        productTypes.includes(type) && {
                          name: "close",
                          type: "ionicon",
                        }
                      }
                      iconRight
                    />
                  ))}
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.subtitle}>
                  <TextCommonsRegular>Marca</TextCommonsRegular>
                </Text>
                <View style={styles.chipsContainer}>
                  {data.brands.slice(0, 7).map((brand) => (
                    <Chip
                      key={brand.id}
                      type="outlined"
                      title={brand.name}
                      containerStyle={
                        brands.includes(brand)
                          ? [styles.chipDialog, styles.selectedDialog]
                          : styles.chipDialog
                      }
                      titleStyle={styles.chipText}
                      onPress={() => handleSelectBrand(brand)}
                      icon={
                        brands.includes(brand) && {
                          name: "close",
                          type: "ionicon",
                        }
                      }
                      iconRight
                    />
                  ))}
                </View>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </>
    );

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <Searchbar
          backgroundColor={Colors.pielcita}
          onTextChange={handleChange}
          placeholder="Buscar productos sin TACC"
        />
        {content}
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 120,
  },

  gluttyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },

  image: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },

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

  chipDialog: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 0.3,
  },

  selectedRecomended: {
    backgroundColor: Colors.pielcita,
  },

  selectedDialog: {
    borderWidth: 1,
  },
});
