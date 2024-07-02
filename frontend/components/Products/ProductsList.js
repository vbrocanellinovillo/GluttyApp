import { FlatList, View } from "react-native";
import ProductItem from "./ProductItem";
import Searchbar from "../UI/Controls/Searchbar";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import { fetchProducts } from "../../services/productsService";
import { Text } from "react-native-svg";

export default function ProductsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(undefined);

  async function handleChange(text) {
    setSearchTerm(text);
    const products = await fetchProducts(searchTerm);
    setData(products);
  }

  console.log(data);

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Searchbar
        backgroundColor={Colors.pielcita}
        onTextChange={handleChange}
      />
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProductItem name={item.name} brand={item.brand} />
          )}
          keyExtractor={(item) => Math.random()}
        />
      ) : (
        <Text>nose</Text>
      )}
    </View>
  );
}
