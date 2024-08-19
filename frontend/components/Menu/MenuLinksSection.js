import { StyleSheet, View, Button } from "react-native";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import { Formik } from "formik";
import DocumentPickerComponent from "../UI/Controls/DocumentPicker";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function MenuLinksSection() {
  return (  
  <><TextCommonsMedium style={styles.title}>Carta Completa</TextCommonsMedium>
  <DocumentPickerComponent /></>
  )}
  
const styles = StyleSheet.create({
  title: {
    marginTop:-70,
    marginBottom: 20,
    fontSize: 25,
    color: Colors.mJordan,
    textAlign: 'center',
  },

  input: {
    backgroundColor: Colors.locro,
    opacity: 0.8,
  },
});
