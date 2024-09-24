import { StyleSheet, View } from "react-native";
import MyStudies from "../../../components/MedicalExams/MyStudies";
import GluttyTips from "../../../components/MedicalExams/GluttyTips";
import { useState } from "react";
import BlurTips from "../../../components/MedicalExams/BlurTips";

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

export default function MedicalStatistics({ navigation }) {
  const [showGluttyTips, setShowGluttyTips] = useState(false);
  const [gluttyTips, setGluttyTips] = useState([]);

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

  return (
    <>
      <View style={styles.container}>
        <View style={styles.firstSection}>
          <MyStudies onPress={navigateMyStudies} />
          <GluttyTips onPress={openGluttyTips} />
        </View>
      </View>
      <BlurTips
        visible={showGluttyTips}
        onDismiss={hideGluttyTips}
        tips={gluttyTips}
      />
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
