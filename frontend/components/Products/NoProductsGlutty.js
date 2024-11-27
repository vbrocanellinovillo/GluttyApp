import { StyleSheet, View, Image } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function NoProductsGlutty() {
  return (
    <View style={styles.gluttyContainer}>
      <TextCommonsMedium style={styles.text}>Buscá tus productos!</TextCommonsMedium>

      <Image
        source={{
          uri: thumbGlutty,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gluttyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 150,
    height: 150,
    objectFit: "contain",
    justifyContent: "center",

  },
  text: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: "center",
    color: "gray",
  },
});
