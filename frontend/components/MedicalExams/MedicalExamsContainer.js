import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";
import AddMedicalExamButton from "./AddMedicalExamButton";

export default function MedicalExamsContainer({ isLoading, isError }) {
  //const branches = useSelector((state) => state.commerce.branches);

  let content;

  if (isLoading) {
    content = <MedicalExamsSkeleton />;
  }

  if (isError) {
    content = <ErrorFetchingMedicalExams />
  }

  // if (!isLoading && !isError && branches && branches.length > 0) {
  //   content = <View></View>
  // }
  
  // if (!isLoading && !isError && branches && branches.length == 0) {
  //   content = <View></View>
  // }

  return (
    <View style={styles.container}>
      <AddMedicalExamButton>
        
      </AddMedicalExamButton>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 35,
    marginTop: 40,
    paddingBottom: 200,
  },
});
