import {
  FlatList,
  StyleSheet,
  View,
  Image,
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

export default function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

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
            title="Arcor"
            type="outlined"
            containerStyle={styles.chip}
            titleStyle={styles.chipText}
          />
          <Chip
            title="Arroz"
            type="outlined"
            containerStyle={styles.chip}
            titleStyle={styles.chipText}
          />
          <Ionicons name="filter" size={24} />
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem product={item} />}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
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
    textAlign: "center",
    color: "black",
  },
});
