import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../../../components/UI/Forms/DismissKeyboadContainer";
import Form from "../../../components/UI/Forms/Form";
import FormTitle from "../../../components/UI/Forms/FormTitle";
import FormControl from "../../../components/UI/Controls/FormControl";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";

export default function BloodTest() {
  function submitHandler({
    igA,
    igG,
    ema,
    hemoglobina,
    hematocrito,
    ferritina,
    ferremia,
    vitB12,
    calcemia,
    vitD,
    alt,
    ast,
    colesterolemia,
    colLDL,
    colHDL,
    trigliceridos,
    glucemia,
  }) {
    onsubmit(
      igA,
      igG,
      ema,
      hemoglobina,
      hematocrito,
      ferritina,
      ferremia,
      vitB12,
      calcemia,
      vitD,
      alt,
      ast,
      colesterolemia,
      colLDL,
      colHDL,
      trigliceridos,
      glucemia
    );
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Form style={styles.form}>
          <View style={styles.sectionContainer}>
            <FormTitle>Anticuerpos Celiaquía</FormTitle>
            <View style={styles.control}>
              <TextCommonsMedium>Ig A anti Transglutaminasa</TextCommonsMedium>
              <FormControl name="igA" />
            </View>
            <View style={styles.control}>
              <TextCommonsMedium>
                Ig G anti Gliadina Deaminada
              </TextCommonsMedium>
              <FormControl name="igG" />
            </View>
            <View style={styles.control}>
              <TextCommonsMedium>
                Anticuerpos antiendomisio (EMA)
              </TextCommonsMedium>
              <FormControl name="ema" />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Hemograma Básico</FormTitle>
            <FormControl label="Hemoglobina" name="hemoglobina" />
            <FormControl label="Hematocrito" name="hematocrito" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Ferritina y Herro Sérico</FormTitle>
            <FormControl label="Ferritina" name="ferritina" />
            <FormControl label="Hierro sérico/Ferremia" name="ferremia" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Vitamina B12</FormTitle>
            <FormControl label="Vitamina B12" name="vitB12" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Calcio y Vitamina D</FormTitle>
            <FormControl label="Calcio sérico/Calcemia" name="calcemia" />
            <FormControl label="Vitamina D" name="vitD" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Función Hepática</FormTitle>
            <FormControl label="ALT (alanina aminotransferasa)" name="alts" />
            <FormControl label="AST (aspartato aminotransferasa)" name="ast" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Perfil Lipídico</FormTitle>
            <FormControl
              label="Colesterol total/Colesterolemia"
              name="colesterolemia"
            />
            <FormControl label="Colesterol LDL" name="colLDL" />
            <FormControl label="Colesterol HDL" name="colHDL" />
            <FormControl
              label="Triglicéridos/Trigliceridemia"
              name="trigliceridos"
            />
            <FormControl label="Glucemia" name="glucemia" />
          </View>
        </Form>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 140,
  },

  form: {
    gap: 14,
  },

  buttonContainer: {
    marginTop: 12,
    paddingBottom: 140,
  },

  bottomText: {
    paddingBottom: 140,
  },

  sectionContainer: {
    padding: 20,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
  },
});
