import BloodTestForm from "../../../../components/MedicalExams/BloodTestForm";

export default function BloodTest({ navigation, route }) {
  const values = route.params?.values;
  const pdf = route.params?.pdf;

  function goBack() {
    navigation.goBack();
  }

  function handleSubmit(values) {}

  return (
    <BloodTestForm
      medicalExam={values}
      onPrev={goBack}
      onSubmit={handleSubmit}
      pdf={pdf}
    />
  );
}
