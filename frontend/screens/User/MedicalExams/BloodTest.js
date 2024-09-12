import { ScrollView, StyleSheet } from "react-native";
import DismissKeyboardContainer from "../../../components/UI/Forms/DismissKeyboadContainer";
import Form from "../../../components/UI/Forms/Form";
import FormTitle from "../../../components/UI/Forms/FormTitle";
import FormControl from "../../../components/UI/Controls/FormControl";

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Form>
          <FormTitle>Anticuerpos celiaquía</FormTitle>
          <FormControl label="Ig A anti Transglutaminasa" name="igA" />
          <FormControl label="Ig G anti Gliadina Deaminada" name="igG" />
          <FormControl label="Anticuerpos antiendomisio (EMA)" name="ema" />
          <FormTitle>Hemograma Básico</FormTitle>
          <FormControl label="Hemoglobina" name="hemoglobina" />
          <FormControl label="Hematocrito" name="hematocrito" />
          <FormTitle>Ferritina y Herro Sérico</FormTitle>
          <FormControl label="Ferritina" name="ferritina" />
          <FormControl label="Hierro sérico/Ferremia" name="ferremia" />
          <FormTitle>Vitamina B12</FormTitle>
          <FormControl label="Vitamina B12" name="vitB12" />
          <FormTitle>Calcio y Vitamina D</FormTitle>
          <FormControl label="Calcio sérico/Calcemia" name="calcemia" />
          <FormControl label="Vitamina D" name="vitD" />
          <FormTitle>Función Hepática</FormTitle>
          <FormControl label="ALT (alanina aminotransferasa)" name="alts" />
          <FormControl label="AST (aspartato aminotransferasa)" name="ast" />
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
        </Form>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },

  buttonContainer: {
    marginTop: 12,
    paddingBottom: 140,
  },

  combobox: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    flex: 1,
  },

  bottomText: {
    paddingBottom: 140,
  },
});
