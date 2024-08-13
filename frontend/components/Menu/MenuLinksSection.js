import { StyleSheet, View, Button } from "react-native";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import { Formik } from "formik";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import DocumentPickerComponent from "../UI/Controls/DocumentPicker";

export default function MenuLinksSection() {
  return (  
  <><TextCommonsRegular style={styles.title}>Carta Completa</TextCommonsRegular>
  <DocumentPickerComponent /></>
  )}
  
const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 24,
    fontSize: 34,
    color: Colors.mJordan,
  },

  input: {
    backgroundColor: Colors.locro,
    opacity: 0.8,
  },
});
