import { StyleSheet, View } from "react-native";
import AddBranchButton from "./AddBranchButton";
import BranchesList from "./BranchesList";
import { useSelector } from "react-redux";
import NoBranches from "./NoBranches";
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";

export default function MedicalExamsContainer({ isLoading, isError }) {
  const branches = useSelector((state) => state.commerce.branches);

  let content;

  if (isLoading) {
    content = <MedicalExamsSkeleton />;
  }

  if (isError) {
    content = <ErrorFetchingMedicalExams />
  }

  if (!isLoading && !isError && branches && branches.length > 0) {
    content = <BranchesList branches={branches} />;
  }
  
  if (!isLoading && !isError && branches && branches.length == 0) {
    content = <NoBranches />;
  }

  return (
    <View style={styles.container}>
      <AddBranchButton />
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
