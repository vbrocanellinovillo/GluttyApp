import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import ProductItem from "./ProductItem";
import Searchbar from "../UI/Controls/Searchbar";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import ProductsSkeleton from "../UI/Loading/ProductsSkeleton";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import NoProductsGlutty from "./NoProductsGlutty";
import RecommendedFilters from "./RecommendedFilters";
import FiltersDialog from "./FiltersDialog";

export default function ProductsList() {
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  // Fetched data
  const [data, setData] = useState(undefined);

  // UI
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

  function isSelectedBrand(brand) {
    if (brands.includes(brand)) {
      return true;
    } else {
      return false;
    }
  }

  function isSelectedType(type) {
    if (productTypes.includes(type)) {
      return true;
    } else {
      return false;
    }
  }

  function handleSelectBrand(pressedBrand) {
    if (isSelectedBrand(pressedBrand)) {
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand !== pressedBrand)
      );
    } else {
      setBrands([...brands, pressedBrand]);
    }
  }

  function handleSelectType(pressedType) {
    if (isSelectedType(pressedType)) {
      setProductTypes((prevTypes) =>
        prevTypes.filter((type) => type !== pressedType)
      );
    } else {
      setProductTypes([...productTypes, pressedType]);
    }
  }

  let content = <NoProductsGlutty />;

  if (isLoading) content = <ProductsSkeleton />;

  if (data) {
    const recommendedBrand = data.brands[0];
    const recommendedType = data.types[0];

    const initialBrands = data.brands.slice(0, 7);
    const initialTypes = data.types.slice(0, 7);

    content = (
      <>
        <RecommendedFilters
          brand={recommendedBrand}
          type={recommendedType}
          toggleFilters={toggleFilters}
          isSelectedBrand={isSelectedBrand}
          isSelectedType={isSelectedType}
          handleSelectBrand={handleSelectBrand}
          handleSelectType={handleSelectType}
        />
        <FlatList
          data={data.products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem product={item} />}
          showsVerticalScrollIndicator={false}
        />
        <FiltersDialog
          brands={initialBrands}
          types={initialTypes}
          toggleFilters={toggleFilters}
          visible={showFilters}
          handleSelectBrand={handleSelectBrand}
          handleSelectType={handleSelectType}
          isSelectedBrand={isSelectedBrand}
          isSelectedType={isSelectedType}
        />
      </>
    );
  }

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
});
