import { StyleSheet, View } from "react-native";
import MyStudies from "../../../components/MedicalExams/MyStudies";
import GluttyTips from "../../../components/MedicalExams/GluttyTips";
import { useState } from "react";
import BlurTips from "../../../components/MedicalExams/BlurTips";

export default function MedicalStatistics({ navigation }) {
  const [showGluttyTips, setShowGluttyTips] = useState(false);
  const [gluttyTips, setGluttyTips] = useState([]);

  function navigateMyStudies() {
    navigation.navigate("MedicalExams");
  }

  function openGluttyTips() {
    setShowGluttyTips(true);
  }

  function hideGluttyTips() {
    setShowGluttyTips(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} />
          <GluttyTips onPress={openGluttyTips} />
        </View>
      </View>
      <BlurTips visible={showGluttyTips} onDismiss={hideGluttyTips} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  firstSection: {
    flexDirection: "row",
    gap: 20,
  },
});
