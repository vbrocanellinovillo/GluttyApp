import { useState } from "react";
import BloodTestForm from "../../../../components/MedicalExams/BloodTestForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { updateMedicalExam } from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";

export default function EditBloodTest({ navigation, route }) {
  const values = route.params?.values;
  const pdf = route.params?.pdf;
  const labs = route.params?.labs;
  const study = route.params?.medicalExam
  const id = route.params?.id;
  console.log("El ID es: ", id )
  const token = useSelector((state) => state.auth.accessToken);

  // Se formatea el estudio para que coincida con los valores para mostrar los datos en la pantalla
  let format_study = {}
  if (study != null) {
    format_study = {
      "date": study.date,
      "lab": study.lab,
    }
    // Recorremos cada una de las variables y guardamos el nombre y al lado el valor
    study.variables.forEach(variable => {
      let nombre_variable = variable.variable_name
      if (nombre_variable == "IgA Anti-Gliadina") {
        nombre_variable = "IgG anti Gliadina Deaminada"
      }else if(nombre_variable == "ALT (alanina aminotransferasa)"){
        nombre_variable = "ALT"
      }else if(nombre_variable == "AST (aspartato aminotransferasa)"){
        nombre_variable = "AST"
      }else if(nombre_variable == "Colesterol Total"){
        nombre_variable = "Colesterol total"
      }else if(nombre_variable == "IgA Anti-Transglutaminasa"){
        nombre_variable = "IgA anti Transglutaminasa"
      }else if(nombre_variable == "Hierro Sérico"){
        nombre_variable = "Hierro sérico"
      }else if(nombre_variable == "Calcio Sérico"){
        nombre_variable = "Calcio sérico"
      }
      format_study[nombre_variable] = variable.value;
    });
  }
  console.log("EL FORMATEO: ")
  console.log(format_study)


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
      await updateMedicalExam(
        id,
        token,
        study.date,
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
      setMessage("Estudio medico actualizado correctamente!");
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
        medicalExam={format_study}
        onPrev={goBack}
        onSubmit={handleSubmit}
        pdf={pdf}
        labs={labs}
      />
    </>
  );
}
