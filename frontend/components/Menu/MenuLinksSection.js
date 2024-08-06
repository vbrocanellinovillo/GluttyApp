import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import { Formik } from "formik";

export default function MenuLinksSection() {
  return (
    <View>
      <TextCommonsMedium style={styles.title}>Carta completa</TextCommonsMedium>
      <Formik>
        {() => (
          <>
            <FormControl
              label="Carga tu pdf"
              style={styles.input}
              labelColor="#222"
            />
            <FormControl
              label="Carga el link a tu menu"
              style={styles.input}
              labelColor="#222"
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    color: Colors.mJordan,
  },

  input: {
    backgroundColor: Colors.locro,
    opacity: 0.8,
  },
});
