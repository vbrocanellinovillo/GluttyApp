import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../../../components/UI/Forms/DismissKeyboadContainer";
import Form from "../../../components/UI/Forms/Form";
import FormTitle from "../../../components/UI/Forms/FormTitle";
import FormControl from "../../../components/UI/Controls/FormControl";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import MedicalControl from "../../../components/UI/Controls/MedicalControl";

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
            <MedicalControl label="Ig A anti Transglutaminasa" unit="U/ml" />
            <MedicalControl label="Ig G anti Gliadina Deaminada" unit="U/ml" />
            <MedicalControl label="Anticuerpos antiendomisio (EMA)" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Hemograma Básico</FormTitle>
            <MedicalControl label="Hemoglobina" unit="g/dL" />
            <MedicalControl label="Hematocrito" unit="%" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Ferritina y Herro Sérico</FormTitle>
            <MedicalControl label="Ferritina" unit="ng/mL" />
            <MedicalControl label="Hierro sérico/Ferremia" unit="µg/dL" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Vitamina B12</FormTitle>
            <MedicalControl label="Vitamina B12" unit="pg/mL" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Calcio y Vitamina D</FormTitle>
            <MedicalControl label="Calcio sérico/Calcemia" unit="mg/dL" />
            <MedicalControl label="Vitamina D" unit="ng/mL" />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Función Hepática</FormTitle>
            <MedicalControl
              label="ALT (alanina aminotransferasa)"
              unit="U/L"
            />
            <MedicalControl
              label="AST (aspartato aminotransferasa)"
              unit="U/L"
            />
          </View>

          <View style={styles.sectionContainer}>
            <FormTitle>Perfil Lipídico</FormTitle>
            <MedicalControl
              label="Colesterol total/Colesterolemia"
              unit="mg/dL"
            />
            <MedicalControl label="Colesterol LDL" unit="mg/dL" />
            <MedicalControl label="Colesterol HDL" unit="mg/dL" />
            <MedicalControl label="Triglicéridos/Trigliceridemia" unit="mg/dL" />
            <MedicalControl label="Glucemia" unit="mg/dL" />
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
    paddingHorizontal: 0
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
    gap: 20
  },
});
