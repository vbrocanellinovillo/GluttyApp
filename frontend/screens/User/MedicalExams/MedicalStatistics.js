import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import MyStudies from "../../../components/MedicalExams/MyStudies";
import GluttyTips from "../../../components/MedicalExams/GluttyTips";
import { useState, useEffect, useCallback } from "react";
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
  getStatistics,
  saveMedicalMessage,
} from "../../../services/medicalExamService";
import { useSelector } from "react-redux";
import GluttyErrorScreen from "../../../components/UI/GluttyErrorScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useRefresh } from "../../../hooks/useRefresh";

export default function MedicalStatistics({ navigation, route }) {
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

  //Check
  const [isChecked, setIsChecked] = useState(false);

  const shouldRefresh = route.params?.shouldRefresh;

  const { refreshing, handleRefresh } = useRefresh(getData);

  function handleCheckChange() {
    setIsChecked((prev) => !prev);
  }

  useFocusEffect(
    useCallback(() => {
      if (shouldRefresh) {
        getData();
      }
    }, [route])
  );

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
      const response = await getInitialData(token);
      let finalData = response;

      if (response && response?.variables) {
        const variablesArray = response?.variables.map((variable) => ({
          value: variable,
          label: variable,
        }));

        finalData = {
          ...finalData,
          options: variablesArray,
        };

        const initialStatistic = await getStatistics(
          token,
          finalData.options[0].value,
          "3 años"
        );

        finalData = {
          ...finalData,
          initialStatistic: initialStatistic,
        };
      }

      setData(finalData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setisloading(false);
    }
  }

  async function closeModalHandler() {
    setIsAccepting(true);
    if (isChecked) {
      try {
        await saveMedicalMessage(token);
      } catch (error) {
      } finally {
        setIsAccepting(false);
        setShowModal(false);
      }
    } else {
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

  if (isloading) return <MedicalStatisticsSkeleton />;

  if (isError)
    return (
      <GluttyErrorScreen
        width={210}
        height={210}
        onRefresh={getData}
        style={{ flex: 0.8 }}
      >
        Ocurrio un error. Por favor intente de nuevo más tarde
      </GluttyErrorScreen>
    );
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="always"
        contentInset={{ bottom: 200 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} number={data?.analysis} />
          <GluttyTips onPress={openGluttyTips} />
        </View>

        <StatisticsContainer
          initialData={data?.initialStatistic}
          variables={data?.options}
        />

        <NextStudyContainer
          onPress={openNextStudy}
          date={data?.["analysis-reminder"]}
        />
      </ScrollView>
      <BlurTips visible={showGluttyTips} onDismiss={hideGluttyTips} />

      <BlurNextStudy
        onDismiss={hideNextStudy}
        visible={showNextStudy}
        getData={getData}
        time={data?.["next-analysis-date"]}
      />

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
        showCheckbox
        isChecked={isChecked}
        onCheckChange={handleCheckChange}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    gap: 20,
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
