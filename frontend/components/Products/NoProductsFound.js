import { StyleSheet, View, Image } from "react-native";
import { sadGlutty } from "../../constants/glutty";

export default function NoProductsFound() {
  return (
    <View style={styles.gluttyContainer}>
      <Image
        source={{
          uri: sadGlutty,
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
    alignItems: "flex-end",
  },

  image: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },
});
