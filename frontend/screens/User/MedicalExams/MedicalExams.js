import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUser } from "../../../services/userService";
import MedicalExamsContainer from "../../../components/MedicalExams/MedicalExamsContainer";
import InfoMedicalContainer from "../../../components/MedicalExams/InfoMedicalContainer";
import { uiActions } from "../../../context/ui";
import ScreenCenter from "../../../components/UI/ScreenCenter";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";


export default function MedicalExams() {
  const token = useSelector((state) => state.auth.accessToken);
  const showMedicalInfo = useSelector((state) => state.ui.medicalDetails);

  const dispatch = useDispatch();
  function showInfoMedicalExams() {
    dispatch(uiActions.toggleMedicalDetails());
  }

  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserMedicalData] = useState();

  useEffect(() => {
    async function getUserMedicalData() {
      try {
        setisloading(true);
        const response = getUser(token);
        setUserData(response);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setisloading(false);
      }
    }

    getUserMedicalData();
  }, []);

  // <ScreenCenter>
  //   <Title>Estudios medicos</Title>
  //   <BoxingGlutty width={400} height={400} />
  // </ScreenCenter>

  return (
    <>
      <MedicalExamsContainer />
      <InfoMedicalContainer
        visible={showMedicalInfo}
        onDismiss={showInfoMedicalExams}
      >
        <ScreenCenter>
          <TextCommonsMedium>
            Información sobre estudios medicos
          </TextCommonsMedium>
        </ScreenCenter>
      </InfoMedicalContainer>
    </>
  );
}
