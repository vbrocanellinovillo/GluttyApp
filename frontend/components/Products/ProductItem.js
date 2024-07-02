import { StyleSheet, Text, View } from "react-native";

export default function ProductItem({ product }) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.brand}>Marca: {product.brand}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#E3E3E3",
    shadowColor: "#1D1B20",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginVertical: 16
  },

  name: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 10
  },

  brand: {
    fontSize: 22,
    fontWeight: "light",
  },
});
