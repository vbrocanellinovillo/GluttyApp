import { StyleSheet, View, Image } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { thumbGlutty } from "../../constants/glutty";

export default function ScannedProduct({ product }) {
  return (
    <View style={styles.productDetail}>
      <TextCommonsMedium style={styles.brand}>Arcor</TextCommonsMedium>
      <TextCommonsRegular style={styles.name}>
        Jugo de naranja
      </TextCommonsRegular>
      <Image source={{ uri: thumbGlutty }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  productDetail: {
    width: 300,
    height: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    padding: 24,
    alignItems: "center",
  },

  image: {
    width: 130,
    height: 130,
    objectFit: "contain",
  },

  brand: {
    fontSize: 16,
    color: "#aaa",
  },

  name: {
    fontSize: 18,
    color: Colors.mJordan,
  },
});
