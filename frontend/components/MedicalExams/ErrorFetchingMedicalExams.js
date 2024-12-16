import { StyleSheet, View } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";

export default function ErrorFetchingMedicalExams({ onRefresh }) {
  
  return (
    <View style={styles.container}>
      <GluttyErrorScreen width={300} height={300} onRefresh={onRefresh}>
        Error con los estudios papuu
      </GluttyErrorScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});
