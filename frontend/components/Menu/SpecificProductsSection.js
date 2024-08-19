import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import { Formik } from "formik";
import * as Location from "expo-location";
import Button from "../UI/Controls/Button";

export default function SpecificProductsSection() {
  // async function geocode() {
  //   const result = await Location.geocodeAsync("Camacua 99 Córdoba");
  //   console.log(result);
  // }

  return (
    <View>
      <TextCommonsMedium style={styles.title}>
        Productos Especificos
      </TextCommonsMedium>
      <TextCommonsMedium style={styles.prox}>proximamente</TextCommonsMedium>
      {/* <Button
        backgroundColor={Colors.mJordan}
        color={Colors.vainilla}
        //onPress={geocode}
      >
        Geolocalizar
      </Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: Colors.mJordan,
    marginTop: 20,
    textAlign: 'center',
  },
  prox: {
    margin: 25,
    textAlign: 'center',
  
  }
});
