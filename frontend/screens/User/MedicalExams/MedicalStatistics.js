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
import BlurContainer from "../../../components/UI/BlurContainer";
import BlurNextStudy from "../../../components/MedicalExams/BlurNextStudy";

const GLUTTY_TIPS = [
  {
    id: 1,
    image:
      "https://img-global.cpcdn.com/recipes/d7b24d251d2b2b1c/1200x630cq70/photo.jpg",
    title: "Comer pan",
    description: "Comer mucho pan es bueno para la hemoglobina",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZd3mKHi1uVagMYEczcyOVwwnxHYEit7th0A&s",
    title: "Tomar cerveza",
    description: "Una botella de cerveza equivale a 3 horas de gimnasio",
  },
  {
    id: 3,
    image:
      "https://resizer.glanacion.com/resizer/v2/ravioles-de-atun-con-berenjena-y-pasas-de-SDMHHOBB2NFG5KMWQQPA527CF4.jpg?auth=4fd6b2526fdbd8677a150b56caaac07a00217dd7cdfc164072895e19fa30328c&width=768&height=512&quality=70&smart=true",
    title: "Nose",
    description:
      "Dale hermano, enserio no tenes nada mejor que hacer que pedirle consejos a un trigo",
  },
];

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
  const [gluttyTips, setGluttyTips] = useState([]);

  const [showNextStudy, setShowNextStudy] = useState(false);

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(
      "Glutty es un médicardo perra, no te hagas la viva con nosotros!"
    );
    setShowModal(true);
  }, []);

  function closeModalHandler() {
    setShowModal(false);
  }

  function navigateMyStudies() {
    navigation.navigate("MedicalExams");
  }

  function openGluttyTips() {
    setShowGluttyTips(true);
    setGluttyTips(GLUTTY_TIPS);
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

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="always"
      >
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} />
          <GluttyTips onPress={openGluttyTips} />
        </View>
        <StatisticsContainer data={STATISTICS} />
        <NextStudyContainer onPress={openNextStudy} />
      </ScrollView>
      <BlurTips
        visible={showGluttyTips}
        onDismiss={hideGluttyTips}
        tips={gluttyTips}
      />
      <BlurNextStudy onDismiss={hideNextStudy} visible={showNextStudy} />
      <GluttyModal
        imageStyle={{ width: 80, height: 80 }}
        other
        customGlutty={doctorGlutty}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
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
