import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import * as Haptics from "expo-haptics";

export default function ProductItem({ product, onPress }) {
  function showDetails() {
    Haptics.selectionAsync();
    onPress(product);
  }

  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : "")}
      onPress={showDetails}
    >
      <View style={styles.item}>
        <TextCommonsMedium style={styles.name} numberOfLines={2}>
          {product.name}
        </TextCommonsMedium>
        <TextCommonsRegular style={styles.brand}>
          Marca: {product.brand}
        </TextCommonsRegular>
      </View>
    </Pressable>
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
    marginVertical: 16,
  },

  name: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "500",
  },

  brand: {
    fontSize: 20,
    fontWeight: "300",
  },

  pressed: {
    opacity: 0.3,
  },
});
