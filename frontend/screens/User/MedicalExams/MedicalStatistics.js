import { ScrollView, StyleSheet, View } from "react-native";
import MyStudies from "../../../components/MedicalExams/MyStudies";
import GluttyTips from "../../../components/MedicalExams/GluttyTips";
import { useState, useEffect } from "react";
import BlurTips from "../../../components/MedicalExams/BlurTips";
import StatisticsContainer from "../../../components/MedicalExams/StatisticsContainer";
import { Colors } from "../../../constants/colors";
import { doctorGlutty } from "../../../constants/glutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import NextStudyContainer from "../../../components/MedicalExams/NextStudyContainer";
import BlurNextStudy from "../../../components/MedicalExams/BlurNextStudy";
import MedicalStatisticsSkeleton from "../../../components/UI/Loading/MedicalStatisticsSkeleton";
import {
  getInitialData,
  saveMedicalMessage,
} from "../../../services/medicalExamService";
import { useSelector } from "react-redux";
import GluttyErrorScreen from "../../../components/UI/GluttyErrorScreen";
import ScheduleNextStudy from "../../../components/MedicalExams/ScheduleNextStudy";

export default function MedicalStatistics({ navigation }) {
  // Blur views
  const [showGluttyTips, setShowGluttyTips] = useState(false);
  const [showNextStudy, setShowNextStudy] = useState(false);

  const token = useSelector((state) => state.auth.accessToken);

  // Get initial data
  const [data, setData] = useState();
  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Disclaimer
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && data.message) {
      setMessage(
        "Glutty no es reemplazo de un doctor o personal médico. Siempre seguí los consejos de tu médico de cabecera."
      );
      setShowModal(true);
    }
  }, [data]);

  async function getData() {
    setisloading(true);
    try {
      const data = await getInitialData(token);
      setData(data);
      const variablesArray = data?.variables.map((variable) => ({
        value: variable,
        label: variable,
      }));

      const updatedData = {
        ...data,
        options: variablesArray,
      };

      setData(updatedData);
      setIsError(false);
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setisloading(false);
    }
  }

  async function closeModalHandler() {
    setIsAccepting(true);
    try {
      await saveMedicalMessage(token);
    } catch (error) {
    } finally {
      setIsAccepting(false);
      setShowModal(false);
    }
  }

  function navigateMyStudies() {
    navigation.navigate("MedicalExams");
  }

  function openGluttyTips() {
    setShowGluttyTips(true);
  }

  function hideGluttyTips() {
    setShowGluttyTips(false);
  }

  function openNextStudy() {
    setShowNextStudy(true);
  }

  function hideNextStudy() {
    setShowNextStudy(false);
  }

  const currentDate = new Date();
  const futureDate = new Date(currentDate.setMonth(currentDate.getMonth() + 8));

  if (isloading) return <MedicalStatisticsSkeleton />;

  if (isError)
    return (
      <GluttyErrorScreen width={210} height={210}>
        Ocurrio un error. Por favor intente de nuevo más tarde
      </GluttyErrorScreen>
    );

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="always"
        contentInset={{ bottom: 160 }}
      >
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} number={data?.analysis} />
          <GluttyTips onPress={openGluttyTips} />
        </View>
<<<<<<< HEAD

        <StatisticsContainer data={STATISTICS} variables={data?.options} />


=======
        <StatisticsContainer variables={data?.options} />
>>>>>>> 4c4e4bb93c02bc772b47e617de26eb13661a6395
        <NextStudyContainer onPress={openNextStudy} date={futureDate} />


      </ScrollView>
      <BlurTips visible={showGluttyTips} onDismiss={hideGluttyTips} />

      <BlurNextStudy onDismiss={hideNextStudy} visible={showNextStudy} />

      <GluttyModal
        imageStyle={{ width: 80, height: 80 }}
        other
        customGlutty={doctorGlutty}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
        imageText={"¡Recorda!"}
        imageTextStyle={styles.imageTextStyle}
        closeButtonText="¡Entendido!"
        closeButtonColor={Colors.mJordan}
        isLoading={isAccepting}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    gap: 30,
  },

  firstSection: {
    flexDirection: "row",
    gap: 20,
  },

  imageTextStyle: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
    color: Colors.mJordan,
  },
});
