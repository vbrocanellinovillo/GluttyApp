import { StyleSheet } from "react-native";
import LoadingWithText from "./LoadingWithText";

export default function LoadingMapBranchDetails() {
  return (
    <LoadingWithText
      containerStyle={styles.container}
      imageStyle={styles.image}
      textStyle={styles.text}
    >
      Cargando...
    </LoadingWithText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 70,
  },

  image: {
    width: "100%",
    height: 150,
  },

  text: {
    fontSize: 26,
  },
});
