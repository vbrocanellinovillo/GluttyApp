import { Dimensions, StyleSheet, View } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function ErrorFetchingMedicalExams({ onRefresh = () => {} }) {
  return (
    <View style={styles.container}>
      <GluttyErrorScreen width={300} height={300} onRefresh={onRefresh}>
        Ocurrio un error. Por favor intente de nuevo más tarde.
      </GluttyErrorScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.55,
    width: width * 0.9,
  },
});
