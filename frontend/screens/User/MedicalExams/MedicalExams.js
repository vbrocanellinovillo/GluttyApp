import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import InfoMedicalContainer from "../../../components/MedicalExams/InfoMedicalContainer";
import { uiActions } from "../../../context/ui";
import { MedicalExamsContainer } from "../../../components/MedicalExams/MedicalExamsContainer";
import InfoMedical from "../../../components/MedicalExams/InfoMedical";
import { getMedicalExamsList } from "../../../services/medicalExamService";

export default function MedicalExams() {
  const token = useSelector((state) => state.auth.accessToken);
  const showMedicalInfo = useSelector((state) => state.ui.medicalDetails);

  const dispatch = useDispatch();
  function showInfoMedicalExams() {
    dispatch(uiActions.toggleMedicalDetails());
  }

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMedicalExams();
  }, []);

  async function fetchMedicalExams() {
    try {
      setLoading(true);
      const response = await getMedicalExamsList(token);

      setExams(response);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <MedicalExamsContainer
        medicalExams={exams?.analysis}
        isLoading={loading}
        isError={isError}
        onRefresh={fetchMedicalExams}
      />
      <InfoMedicalContainer
        visible={showMedicalInfo}
        onDismiss={showInfoMedicalExams}
      >
        <InfoMedical />
      </InfoMedicalContainer>
    </>
  );
}
