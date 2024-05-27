import { Colors } from "../../constants/colors";
import Title from "./Title";
import { View, Image, StyleSheet } from "react-native";

export default function FormHeader({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/sin-gluten.webp")}
          style={styles.image}
        />
      </View>
      <Title color={Colors.mJordan}>{title}</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignItems: "center",
  },

  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
});
