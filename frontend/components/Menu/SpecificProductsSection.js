import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import { Formik } from "formik";

export default function SpecificProductsSection() {
  return (
    <View>
      <TextCommonsMedium style={styles.title}>
        Productos Especificos
      </TextCommonsMedium>
      <TextCommonsMedium>proximamente</TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: Colors.mJordan,
  },
});
