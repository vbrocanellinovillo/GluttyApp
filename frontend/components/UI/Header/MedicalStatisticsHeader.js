import { Image, StyleSheet } from "react-native";
import Header from "./Header";
import HeaderTitle from "./HeaderTitle";
import { doctorGlutty } from "../../../constants/glutty";

export default function MedicalStatisticsHeader() {
  return (
    <Header style={styles.container}>
      <HeaderTitle style={styles.text}>Estadísticas{"\n"}médicas</HeaderTitle>
      <Image source={{ uri: doctorGlutty }} style={styles.image} />
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 165,
  },

  text: {
    fontSize: 36,
    fontWeight: "300",
    textAlign: "left"
  },

  image: {
    width: 75,
    height: 75,
    objectFit: "contain",
  },
});
