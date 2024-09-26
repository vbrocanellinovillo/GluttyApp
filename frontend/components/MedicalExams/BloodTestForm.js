import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import Form from "../UI/Forms/Form";
import MedicalControl from "../UI/Controls/MedicalControl";
import { Formik } from "formik";
import RadioButtonsControl from "../UI/Controls/RadioButtonsControl";
import FormControl from "../UI/Controls/FormControl";
import DateControl from "../UI/Controls/DateControl";
import FormButtonsGroup from "../UI/Controls/FormButtonsGroup";
import { formatShortToYYYYMMDD, isFutureDate } from "../../utils/dateFunctions";
import PdfIconItem from "../UI/Pdf/PdfIconItem";
import FormSectionContainer from "../UI/Forms/FormSectionContainer";

const ema = [
  { label: "Positivo", value: "positivo" },
  { label: "Negativo", value: "negativo" },
];

export default function BloodTestForm({ onSubmit, onPrev, medicalExam, pdf }) {
  function submitHandler(values) {
    // Ajuste de la fecha
    const formattedDate = formatShortToYYYYMMDD(values.date);
    values.date = formattedDate;

    const valuesWithPdf = { ...values, pdf };

    onSubmit(valuesWithPdf);
  }

  const today = new Date(Date.now());

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            igA: medicalExam?.atTG_IgA,
            igG: medicalExam?.aDGP_IgA,
            ema: medicalExam?.antiendomisio,
            hemoglobina: medicalExam?.hemoglobina,
            hematocrito: medicalExam?.hematocrito,
            ferritina: medicalExam?.ferritina,
            ferremia: medicalExam?.hierro_serico,
            vitB12: medicalExam?.vitamina_b12,
            calcemia: medicalExam?.calcio_serico,
            vitD: medicalExam?.vitamina_d,
            alt: medicalExam?.alt,
            ast: medicalExam?.ast,
            colesterolemia: medicalExam?.colesterol_total,
            colLDL: medicalExam?.colesterol_ldl,
            colHDL: medicalExam?.colesterol_hdl,
            trigliceridos: medicalExam?.trigliceridos,
            glucemia: medicalExam?.glucemia,
            laboratory: "",
            date: today,
          }}
          validate={({ date }) => {
            const errors = {};

            const formattedDate = formatShortToYYYYMMDD(date);
            if (isFutureDate(formattedDate)) {
              errors.date = "Fecha futura";
            }

            return errors;
          }}
          onSubmit={submitHandler}
        >
          {({
            values,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Form style={styles.form}>
              <FormSectionContainer title="Datos Generales">
                <DateControl
                  title="Fecha de realización"
                  value={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  errors={errors.date}
                />
                <FormControl
                  style={styles.formControl}
                  value={values.laboratory}
                  label="Laboratorio"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors.laboratory}
                  touched={touched.laboratory}
                  name="laboratory"
                />
              </FormSectionContainer>

              <FormSectionContainer title="Anticuerpos Celiaquía">
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
              </FormSectionContainer>

              <FormSectionContainer title="Hemograma Básico">
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
              </FormSectionContainer>

              <FormSectionContainer title="Ferritina y Herro Sérico">
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
              </FormSectionContainer>

              <FormSectionContainer title="Vitamina B12">
                <MedicalControl
                  label="Vitamina B12"
                  unit="pg/mL"
                  value={values.vitB12}
                  defaultValue=""
                  onChange={(value) => setFieldValue("vitB12", value)}
                  errors={errors.vitB12}
                />
              </FormSectionContainer>

              <FormSectionContainer title="Calcio y Vitamina D">
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
              </FormSectionContainer>

              <FormSectionContainer title="Función Hepática">
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
              </FormSectionContainer>

              <FormSectionContainer title="Perfil Lipídico">
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
              </FormSectionContainer>

              {pdf && (
                <FormSectionContainer title="PDF Cargado">
                  <PdfIconItem name={pdf?.name} />
                </FormSectionContainer>
              )}

              <View style={styles.buttonContainer}>
                <FormButtonsGroup
                  prev="Anterior"
                  next="Guardar"
                  onNext={handleSubmit}
                  onPrev={onPrev}
                />
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
