import ScreenCenter from "../../../components/UI/ScreenCenter";
import BoxingGlutty from "../../../components/UI/SVGGlutty/BoxingGlutty";
import Title from "../../../components/UI/Title";
import { useSelector } from "react-redux";
import { update } from "../../../services/userService";
import { authActions } from "../../../context/auth";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import { getUser } from "../../../services/userService";
import MedicalExamsContainer from "../../../components/MedicalExams/MedicalExamsContainer";

export default function MedicalExams() {
  const token = useSelector((state) => state.auth.accessToken);

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

  return <MedicalExamsContainer />
}