import { FlatList, StyleSheet, View, Text, Image } from "react-native";
import ProductItem from "./ProductItem";
import Searchbar from "../UI/Controls/Searchbar";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/productsService";
import { Skeleton } from "@rneui/themed";

function SkeletonLoading() {

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Skeleton width={100}/>
    </View>
  );
}

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

  if (isLoading) content = <SkeletonLoading />;

  if (data)
    content = (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    );

  return (
    <View style={styles.container}>
      <Searchbar
        backgroundColor={Colors.pielcita}
        onTextChange={handleChange}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
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
});
