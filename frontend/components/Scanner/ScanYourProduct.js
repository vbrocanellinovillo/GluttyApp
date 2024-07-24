import { Image, StyleSheet } from "react-native";
import DetailContainer from "./DetailContainer";
import GradientText from "../UI/GradientText";

export default function ScanYourProduct() {
  return (
    <DetailContainer style={styles.container}>
      <GradientText style={styles.title}>Escanea tus productos!</GradientText>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1721774401/sin-gluten_v4pqjx.webp",
        }}
        style={styles.image}
      />
    </DetailContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
});
