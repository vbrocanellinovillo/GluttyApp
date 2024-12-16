import React from "react";
import { StyleSheet, View, Image } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { doctorGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";

const NoMedicalExams = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: doctorGlutty }} style={styles.image} />
      <TextCommonsMedium style={styles.text}>
        Aún no hay estudios médicos cargados
      </TextCommonsMedium>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
  },

  image: {
    width: 150,
    height: 320,
    marginBottom: 10,
    resizeMode: "contain",
  },

  text: {
    fontSize: 24,
    color: Colors.mJordan,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default NoMedicalExams;
