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
    borderRadius: 15,
    backgroundColor: "#E3E3E3",
    shadowColor: "#1D1B20",
    shadowOffset: { width: 0.5, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginVertical: 16,
    
  },

  name: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "500",
  },

  brand: {
    fontSize: 18,
    fontWeight: "300",
  },

  pressed: {
    opacity: 0.3,
  },
});
