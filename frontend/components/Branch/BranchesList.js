import { FlatList, StyleSheet, View } from "react-native";
import BranchItem from "./BranchItem";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";

export default function BranchesList() {

  const userData = useSelector((state) => state.auth.userData);
  const BRANCH = userData.Branches
  console.log(BRANCH);

  return (
    <FlatList
      data={BRANCH}
      renderItem={({ item }) => (
        <BranchItem name={item.name} address={item.address} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
    )
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 30,
  },
});
