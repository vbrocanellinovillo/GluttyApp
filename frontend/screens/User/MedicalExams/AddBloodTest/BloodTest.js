import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../../../../components/UI/Forms/DismissKeyboadContainer";
import Form from "../../../../components/UI/Forms/Form";
import FormTitle from "../../../../components/UI/Forms/FormTitle";
import MedicalControl from "../../../../components/UI/Controls/MedicalControl";
import { Formik } from "formik";
import Button from "../../../../components/UI/Controls/Button";
import { Colors } from "../../../../constants/colors";
import RadioButtonsControl from "../../../../components/UI/Controls/RadioButtonsControl";
import FormControl from "../../../../components/UI/Controls/FormControl";
import TextCommonsRegular from "../../../../components/UI/FontsTexts/TextCommonsRegular";
import DateControl from "../../../../components/UI/Controls/DateControl";

const ema = [
  { label: "Positivo", value: "No ni" },
  { label: "Negativo", value: "idea bro" },
];

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

  const today = new Date(Date.now());

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            igA: "",
            igG: "",
            ema: "",
            hemoglobina: "",
            hematocrito: "",
            ferritina: "",
            ferremia: "",
            vitB12: "",
            calcemia: "",
            vitD: "",
            alt: "",
            ast: "",
            colesterolemia: "",
            colLDL: "",
            colHDL: "",
            trigliceridos: "",
            glucemia: "",
            laboratory: "",
            date: today,
          }}
          validate={({ igA, ema }) => {
            const errors = {};

            if (igA < 10) {
              errors.igA = "anti trans debe ser mayor a 10";
            }

            return errors;
          }}
          onSubmit={submitHandler}
        >
          {({ values, setFieldValue, handleSubmit, errors, touched }) => (
            <Form style={styles.form}>
              <DateControl title="Fecha de realización" value={values.date} />
              <View style={styles.sectionContainer}>
                <FormTitle>Anticuerpos Celiaquía</FormTitle>
                <MedicalControl
                  label="Ig A anti Transglutaminasa"
                  unit="U/ml"
                  value={values.igA}
                  defaultValue=""
                  onChange={(value) => setFieldValue("igA", value)}
                  errors={errors.igA}
                />
                <MedicalControl
                  label="Ig G anti Gliadina Deaminada"
                  unit="U/ml"
                  value={values.igG}
                  defaultValue=""
                  onChange={(value) => setFieldValue("igG", value)}
                  errors={errors.igG}
                />
                <RadioButtonsControl
                  title="Anticuerpos antiendomisio (EMA)"
                  options={ema}
                  onValueChange={(value) => setFieldValue("ema", value)}
                  value={values.ema}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Hemograma Básico</FormTitle>
                <MedicalControl
                  label="Hemoglobina"
                  unit="g/dL"
                  value={values.hemoglobina}
                  defaultValue=""
                  onChange={(value) => setFieldValue("hemoglobina", value)}
                  errors={errors.hemoglobina}
                />
                <MedicalControl
                  label="Hematocrito"
                  unit="%"
                  value={values.hematocrito}
                  defaultValue=""
                  onChange={(value) => setFieldValue("hematocrito", value)}
                  errors={errors.hematocrito}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Ferritina y Herro Sérico</FormTitle>
                <MedicalControl
                  label="Ferritina"
                  unit="ng/mL"
                  value={values.ferritina}
                  defaultValue=""
                  onChange={(value) => setFieldValue("ferritina", value)}
                  errors={errors.ferritina}
                />
                <MedicalControl
                  label="Hierro sérico/Ferremia"
                  unit="µg/dL"
                  value={values.ferremia}
                  defaultValue=""
                  onChange={(value) => setFieldValue("ferremia", value)}
                  errors={errors.ferremia}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Vitamina B12</FormTitle>
                <MedicalControl
                  label="Vitamina B12"
                  unit="pg/mL"
                  value={values.vitB12}
                  defaultValue=""
                  onChange={(value) => setFieldValue("vitB12", value)}
                  errors={errors.vitB12}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Calcio y Vitamina D</FormTitle>
                <MedicalControl
                  label="Calcio sérico/Calcemia"
                  unit="mg/dL"
                  value={values.calcemia}
                  defaultValue=""
                  onChange={(value) => setFieldValue("calcemia", value)}
                  errors={errors.calcemia}
                />
                <MedicalControl
                  label="Vitamina D"
                  unit="ng/mL"
                  value={values.vitD}
                  defaultValue=""
                  onChange={(value) => setFieldValue("vitD", value)}
                  errors={errors.vitD}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Función Hepática</FormTitle>
                <MedicalControl
                  label="ALT (alanina aminotransferasa)"
                  unit="U/L"
                  value={values.alt}
                  defaultValue=""
                  onChange={(value) => setFieldValue("alt", value)}
                  errors={errors.alt}
                />
                <MedicalControl
                  label="AST (aspartato aminotransferasa)"
                  unit="U/L"
                  value={values.ast}
                  defaultValue=""
                  onChange={(value) => setFieldValue("ast", value)}
                  errors={errors.ast}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Perfil Lipídico</FormTitle>
                <MedicalControl
                  label="Colesterol total/Colesterolemia"
                  unit="mg/dL"
                  value={values.colesterolemia}
                  defaultValue=""
                  onChange={(value) => setFieldValue("colesterolemia", value)}
                  errors={errors.colesterolemia}
                />
                <MedicalControl
                  label="Colesterol LDL"
                  unit="mg/dL"
                  value={values.colLDL}
                  defaultValue=""
                  onChange={(value) => setFieldValue("colLDL", value)}
                  errors={errors.colLDL}
                />
                <MedicalControl
                  label="Colesterol HDL"
                  unit="mg/dL"
                  value={values.colHDL}
                  defaultValue=""
                  onChange={(value) => setFieldValue("colHDL", value)}
                  errors={errors.colHDL}
                />
                <MedicalControl
                  label="Triglicéridos/Trigliceridemia"
                  unit="mg/dL"
                  value={values.trigliceridos}
                  defaultValue=""
                  onChange={(value) => setFieldValue("trigliceridos", value)}
                  errors={errors.trigliceridos}
                />
                <MedicalControl
                  label="Glucemia"
                  unit="mg/dL"
                  value={values.glucemia}
                  defaultValue=""
                  onChange={(value) => setFieldValue("glucemia", value)}
                  errors={errors.glucemia}
                />
              </View>

              <View style={styles.sectionContainer}>
                <FormTitle>Datos Generales</FormTitle>
                <View>
                  <TextCommonsRegular style={styles.label}>
                    Laboratorio
                  </TextCommonsRegular>
                  <FormControl
                    style={styles.formControl}
                    value={values.laboratory}
                    label="Laboratorio donde se realizo el estudio"
                  />
                </View>

                <View>
                  <TextCommonsRegular style={styles.label}>
                    Fecha de realización
                  </TextCommonsRegular>
                  
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  backgroundColor={Colors.locro}
                  color={Colors.mJordan}
                  onPress={handleSubmit}
                >
                  Confirmar
                </Button>
              </View>
            </Form>
          )}
        </Formik>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 380,
  },

  form: {
    gap: 14,
    paddingHorizontal: 0,
  },

  buttonContainer: {
    marginTop: 12,
  },

  bottomText: {
    paddingBottom: 140,
  },

  sectionContainer: {
    padding: 16,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    gap: 20,
  },

  formControl: {
    backgroundColor: "#eee",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    borderWidth: 0,
    overflow: "visible",
  },
});
