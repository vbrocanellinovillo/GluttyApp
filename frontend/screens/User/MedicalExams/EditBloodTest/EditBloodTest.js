import { useState } from "react";
import BloodTestForm from "../../../../components/MedicalExams/BloodTestForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { registerMedicalExam } from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";

export default function EditBloodTest({ navigation, route }) {
  const values = route.params?.values;
  const pdf = route.params?.pdf;
  const labs = route.params?.labs;
  const study = route.params?.medicalExam

  const token = useSelector((state) => state.auth.accessToken);


  /*
  --AAAAAAAAAAAAAAAAAAAAAAAAAAA--

  Dado al medical exam tengo que armar un nuevo objeto en el cual vaya por todas las variables y tome solamente el valor y de cada variable. ejemplo: IgA anti Transglutaminasa: valor_Variable


  
  "date": "2022-10-05", "lab": "LACE", "variables": [{"description": "Anticuerpos utilizados para diagnosticar la enfermedad celíaca, ya que indican una respuesta inmunológica al gluten en personas con esta condición.", "max_value": 9.99, "min_value": 0, "unit_of_measurement": "U/mL", "value": "4", "variable_name": "IgA Anti-Transglutaminasa"}, {"description": "Anticuerpos que responden a la gliadina, una proteína del gluten, usados en el diagnóstico de la enfermedad celíaca.", "max_value": 11.99, "min_value": 0, "unit_of_measurement": "UI/mL", "value": "2", "variable_name": "IgA Anti-Gliadina"}, {"description": "Anticuerpos específicos que se usan para confirmar la enfermedad celíaca, con alta precisión diagnóstica.", "max_value": null, "min_value": null, "unit_of_measurement": " ", "value": "Positivo", "variable_name": "Anticuerpos antiendomisio (EMA)"}, {"description": "Proteína en los glóbulos rojos que transporta oxígeno desde los pulmones al resto del cuerpo. Es esencial para mantener el cuerpo bien oxigenado.", "max_value": 16, "min_value": 12, "unit_of_measurement": "g/dL", "value": 13, "variable_name": "Hemoglobina"}, {"description": "Mide el porcentaje de glóbulos rojos en la sangre. Es una medida clave para entender la composición sanguínea.", "max_value": 47, "min_value": 37, "unit_of_measurement": "%", "value": 36.4, "variable_name": "Hematocrito"}, {"description": "Proteína que almacena hierro en el cuerpo, proporcionando una reserva que puede utilizarse cuando el cuerpo lo necesita.", "max_value": 160, "min_value": 30, "unit_of_measurement": "ug/L", "value": 22, "variable_name": "Ferritina"}, {"description": "Cantidad de hierro presente en el suero sanguíneo, importante para la formación de glóbulos rojos y transporte de oxígeno.", "max_value": 145, "min_value": 40, "unit_of_measurement": "ug/dL", "value": 104, "variable_name": "Hierro Sérico"}, {"description": "Vitamina esencial para la producción de glóbulos rojos y el buen funcionamiento del sistema nervioso.", "max_value": 1132, "min_value": 179, "unit_of_measurement": "pg/mL", "value": 581, "variable_name": "Vitamina B12"}, {"description": "Mineral esencial para mantener los huesos fuertes, además de regular la función muscular y nerviosa.", "max_value": null, "min_value": null, "unit_of_measurement": "mg/dl", "value": 18, "variable_name": "Calcio Sérico"}, {"description": "Vitamina crucial para la salud ósea, ya que facilita la absorción de calcio y ayuda en la función inmunitaria.", "max_value": null, "min_value": 20, "unit_of_measurement": "ng/ml", "value": 23, "variable_name": "Vitamina D"}, {"description": "Enzima presente en el hígado, que ayuda a descomponer proteínas. Se mide para evaluar la función hepática.", "max_value": 38, "min_value": 5, "unit_of_measurement": "U/L", "value": 9, "variable_name": "ALT (alanina aminotransferasa)"}, {"description": "Enzima presente en el hígado, el corazón y los músculos. Participa en el metabolismo de los aminoácidos.", "max_value": 35, "min_value": 5, "unit_of_measurement": "U/L", "value": 12, "variable_name": "AST (aspartato aminotransferasa)"}, {"description": "Suma del colesterol en la sangre, que incluye tanto el colesterol 'bueno' como el 'malo'.", "max_value": null, "min_value": null, "unit_of_measurement": "mg/dl", "value": 42, "variable_name": "Colesterol Total"}, {"description": "Conocido como 'colesterol malo', se transporta a través de la sangre y puede depositarse en las arterias.", "max_value": null, "min_value": null, "unit_of_measurement": "mg/dl", "value": 20, "variable_name": "Colesterol LDL"}, {"description": "'Colesterol bueno' que ayuda a transportar el colesterol desde las arterias hacia el hígado para su eliminación.", "max_value": null, "min_value": null, "unit_of_measurement": "mg/dl", "value": 50, "variable_name": "Colesterol HDL"}, {"description": "Tipo de grasa presente en la sangre, derivada principalmente de los alimentos que consumes.", "max_value": null, "min_value": null, "unit_of_measurement": "mg/dl", "value": 18, "variable_name": "Triglicéridos"}, {"description": "Nivel de glucosa en la sangre. La glucosa es la principal fuente de energía para las células del cuerpo.", "max_value": 100, "min_value": 70, "unit_of_measurement": "mg/dl", "value": 92, "variable_name": "Glucemia"}]}
  
  
  
  */


  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  console.log(study)

  function goBack() {
    navigation.goBack();
  }

  function closeModalHandler() {
    setShowModal(false);

    if (!isError) {
      navigation.navigate("MedicalExams");
    }
  }

  async function handleSubmit({
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
    laboratory,
    date,
    pdf,
  }) {
    setIsLoading(true);
    try {
      await registerMedicalExam(
        token,
        date,
        laboratory,
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
        pdf
      );
      setIsError(false);
      setMessage("Estudio medico registrado correctamente!");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage("Ocurrio un error. Por favor intente de nuevo más tarde");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isLoading} />
      <GluttyModal
        visible={showModal}
        isError={isError}
        message={message}
        onClose={closeModalHandler}
      />
      <BloodTestForm
        medicalExam={study.variables}
        onPrev={goBack}
        onSubmit={handleSubmit}
        pdf={pdf}
        labs={labs}
      />
    </>
  );
}
