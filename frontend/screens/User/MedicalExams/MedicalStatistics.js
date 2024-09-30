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
import { saveMedicalMessage } from "../../../services/medicalExamService";
import { useSelector } from "react-redux";

const STATISTICS = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: () => Colors.humita, // optional
      strokeWidth: 2, // optional
    },
    {
      data: [5, 15, 4, 30, 59, 22],
      color: () => Colors.mJordan,
      strokeWidth: 2, // optional
    },
  ],
  legend: ["Glucosa", "Minimos"], // optional
};

export default function MedicalStatistics({ navigation }) {
  const [showGluttyTips, setShowGluttyTips] = useState(false);

  const [showNextStudy, setShowNextStudy] = useState(false);
  const token = useSelector((state) => state.auth.accessToken);
  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(
      "Glutty no es un doctor o personal médico. Siempre seguí los consejos de tu médico de cabecera."
    );
    //aca el condicional
    setShowModal(true);
  }, []);

  function closeModalHandler() {
    //Aca deberia actualizar un valor del usuario dejando el boolean de T&C como true. Ponele qsy
    saveMedicalMessage(token);
    setShowModal(false);
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

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="always"
        contentInset={{ bottom: 80 }}
      >
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} />
          <GluttyTips onPress={openGluttyTips} />
        </View>
        <StatisticsContainer data={STATISTICS} />
        <NextStudyContainer onPress={openNextStudy} date={futureDate} />
      </ScrollView>
      <BlurTips
        visible={showGluttyTips}
        onDismiss={hideGluttyTips}
      />
      <BlurNextStudy onDismiss={hideNextStudy} visible={showNextStudy} />
      <GluttyModal
        imageStyle={{ width: 80, height: 80 }}
        other
        customGlutty={doctorGlutty}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
        imageText={"¡Recorda!"}
        imageTextStyle={{
          fontSize: 40,
          fontWeight: "600",
          textAlign: "center",
          marginVertical: 10,
        }}
        closeButtonText="¡Entendido!"
        closeButtonColor="#000"
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
});
