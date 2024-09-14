import { StyleSheet, View } from "react-native";
import MyStudies from "../../../components/MedicalExams/MyStudies";
import GluttyTips from "../../../components/MedicalExams/GluttyTips";

export default function MedicalStatistics({ navigation }) {
  function navigateMyStudies() {
    navigation.navigate("MedicalExams");
  }

  function navigateGluttyTips() {
    navigation.navigate("GluttyTips");
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <MyStudies onPress={navigateMyStudies} />
        <GluttyTips onPress={navigateGluttyTips} />
      </View>
    </View>
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
