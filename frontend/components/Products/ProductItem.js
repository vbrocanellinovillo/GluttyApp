import { Pressable, StyleSheet, Text, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { useNavigation } from "@react-navigation/native";

export default function ProductItem({ product }) {
  const navigation = useNavigation();

  function navigateHandler() {
    navigation.navigate("Details", { product });
  }

  return (
    <Pressable style={({ pressed }) => (pressed ? styles.pressed : "")} onPress={navigateHandler}>
      <View style={styles.item}>
        <TextCommonsMedium style={styles.name}>
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
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "500",
  },

  brand: {
    fontSize: 22,
    fontWeight: "300",
  },

  pressed: {
    opacity: 0.3,
  },
});
