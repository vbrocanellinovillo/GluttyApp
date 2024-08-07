import { StyleSheet, View } from "react-native";
import AddBranchButton from "./AddBranchButton";
import BranchesList from "./BranchesList";

export default function BranchesContainer() {
  return (
    <View style={styles.container}>
      <AddBranchButton />
      <BranchesList />
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
