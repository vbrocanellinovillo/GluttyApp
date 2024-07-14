import { FlatList, StyleSheet, Text, View } from "react-native";
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
import { useQuery } from "@tanstack/react-query";
import NoProductsFound from "./NoProductsFound";

export default function ProductsList() {
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  // UI
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () => fetchProducts({ searchTerm, brands, types }),
    enabled: false,
  });

  const [fetchFilters, setFetchFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        return;
      }
      refetch();
    };

    fetchData();
  }, [searchTerm, fetchFilters]);

  function handleChange(text) {
    setSearchTerm(text);
  }

  function toggleFilters() {
    setShowFilters(!showFilters);
  }

  function isSelectedBrand(brand) {
    return brands.includes(brand);
  }

  function isSelectedType(type) {
    return types.includes(type);
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
      setTypes((prevTypes) => prevTypes.filter((type) => type !== pressedType));
    } else {
      setTypes([...types, pressedType]);
    }
  }

  function fetchWithFilters() {
    setFetchFilters(!fetchFilters);
  }

  let content = <></>;

  if (!isLoading && searchTerm.trim() === "") content = <NoProductsGlutty />;

  if (isLoading) content = <ProductsSkeleton />;

  if (data && !isLoading && searchTerm.trim() !== "") {
    if (data.products.length === 0) {
      content = <NoProductsFound />;
    } else {
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
            onPressFilter={fetchWithFilters}
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
            onSearch={fetchWithFilters}
          />
        </>
      );
    }
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
