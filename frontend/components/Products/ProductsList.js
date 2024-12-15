import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
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
import BlurDetails from "./BlurDetails";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../context/ui";
import * as Haptics from "expo-haptics";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function ProductsList({
  initialFilters,
  isLoadingInitialFilters,
}) {
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  const [recommendedBrands, setRecommendedBrands] = useState([]);
  const [recommendedTypes, setRecommendedTypes] = useState([]);

  // UI
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  // Product details
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [product, setProduct] = useState(null);

  // Token
  const token = useSelector((state) => state.auth.accessToken);

  // Pagination
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [products, setProducts] = useState([]);

  const pageSize = 10;

  // Fetch data
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ["products", searchTerm, brands, types],
    queryFn: () =>
      fetchProducts({ searchTerm, brands, types, token, page, pageSize }),
    enabled: false,
  });

  useEffect(() => {
    fetchData();
  }, [searchTerm, brands, types]);

  useEffect(() => {
    setSearchTerm("");
    setPage(1);
  }, [brands, types]);

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) =>
        page === 1 ? data.products : [...prevProducts, ...data.products]
      );
      setHasNextPage(data.products.length === pageSize);
    }
  }, [data]);

  useEffect(() => {
    if (searchTerm.trim() !== "" || brands.length !== 0 || types.length !== 0) {
      refetch();
    }
  }, [page]);

  useEffect(() => {
    setRecommendedBrands([initialFilters?.marca]);
    setRecommendedTypes([initialFilters?.tipo]);
  }, [initialFilters]);

  const fetchData = async () => {
    if (searchTerm.trim() === "" && brands.length === 0 && types.length === 0) {
      return;
    }
    setPage(1);
    setProducts([]);
    refetch();
  };

  function handleChange(text) {
    setSearchTerm(text);
    setPage(1);
  }

  function clearSearchTerm() {
    setSearchTerm("");
    setPage(1);
  }

  function toggleFilters() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowFilters(!showFilters);
  }

  function isSelectedBrand(brand) {
    return brands.includes(brand);
  }

  function isSelectedType(type) {
    return types.includes(type);
  }

  function handleSelectBrand(pressedBrand) {
    Haptics.selectionAsync();
    if (isSelectedBrand(pressedBrand)) {
      setBrands((prevBrands) =>
        prevBrands.filter((brand) => brand !== pressedBrand)
      );
    } else {
      setBrands([...brands, pressedBrand]);
    }
  }

  function handleSelectType(pressedType) {
    Haptics.selectionAsync();
    if (isSelectedType(pressedType)) {
      setTypes((prevTypes) => prevTypes.filter((type) => type !== pressedType));
    } else {
      setTypes([...types, pressedType]);
    }
  }

  function searchWithFilters(selectedBrands, selectedTypes) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setBrands(selectedBrands);
    setTypes(selectedTypes);
    setPage(1);
  }

  function showDetails(product) {
    setProduct(product);
    dispatch(uiActions.toggleBlurHeader());
    setDetailsVisible(true);
  }

  function hideDetails() {
    dispatch(uiActions.toggleBlurHeader());
    setDetailsVisible(false);
    setProduct(undefined);
  }

  function loadMoreProducts() {
    if (hasNextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  function renderLoadingFooter() {
    return hasNextPage ? (
      <ActivityIndicator color={Colors.mJordan} size="small" />
    ) : null;
  }

  let content = <></>;

  let initialBrands = initialFilters?.marcas || [];
  let initialTypes = initialFilters?.tipos || [];

  if (!isLoading && searchTerm.trim() === "") content = <NoProductsGlutty />;

  if (isLoading) content = <ProductsSkeleton />;

  if (isError)
    content = (
      <GluttyErrorScreen width={250} height={250} onRefresh={fetchData}>
        Ocurrió un error al buscar las productos. Por favor intente más tarde.
      </GluttyErrorScreen>
    );

  if (data && !isLoading) {
    if (data.brands && data.brands.length > 0) {
      initialBrands = data.brands.slice(0, 7);

      if (data.brands.length > 1) {
        const firstBrand = data.brands[0].nombre;
        const secondBrand = data.brands[1].nombre;

        if (recommendedBrands[0] !== firstBrand) {
          setRecommendedBrands([firstBrand, secondBrand]);
        }
      }
    }

    if (data.types && data.types.length > 0) {
      initialTypes = data.types.slice(0, 7);

      if (data.types.length > 1) {
        const firstType = data.types[0].nombre;
        const secondType = data.types[1].nombre;

        if (recommendedTypes[0] !== firstType) {
          setRecommendedTypes([firstType, secondType]);
        }
      }
    }

    if (data.products.length === 0) {
      content = <NoProductsFound />;
    } else {
      content = (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} onPress={showDetails} />
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreProducts}
          ListFooterComponent={renderLoadingFooter}
        />
      );
    }
  }

  return (
    <>
      <DismissKeyboardContainer>
        <View style={styles.container}>
          <Searchbar
            onChange={handleChange}
            onClear={clearSearchTerm}
            placeholder="Buscar productos sin TACC"
            placeholderTextColor={Colors.mJordan}
            value={searchTerm}
            style={styles.searchbar}
          />
          {(recommendedBrands.length > 1 ||
            recommendedTypes.length > 1 ||
            (recommendedBrands.length > 0 && recommendedTypes.length > 0)) && (
            <RecommendedFilters
              brands={recommendedBrands}
              types={recommendedTypes}
              toggleFilters={toggleFilters}
              isSelectedBrand={isSelectedBrand}
              isSelectedType={isSelectedType}
              handleSelectBrand={handleSelectBrand}
              handleSelectType={handleSelectType}
              isLoadingInitialFilters={isLoadingInitialFilters}
            />
          )}
          {content}
        </View>
      </DismissKeyboardContainer>
      <BlurDetails
        isVisible={detailsVisible}
        product={product}
        onDismiss={hideDetails}
      />
      <FiltersDialog
        brands={initialBrands}
        types={initialTypes}
        toggleFilters={toggleFilters}
        visible={showFilters}
        onSearch={searchWithFilters}
        markedBrands={brands}
        markedTypes={types}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 120,
  },

  searchbar: {
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1.2,
    borderBottomColor: Colors.mJordan,
    fontSize: 20,
    backgroundColor: Colors.pielcita,
    marginBottom: -10,
  },
});
