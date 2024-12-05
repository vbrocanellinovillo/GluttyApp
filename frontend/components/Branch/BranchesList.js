import { FlatList, StyleSheet } from "react-native";
import BranchItem from "./BranchItem";
import { ViewBranch } from "../../screens/Commerce/Branches/EditBranch/ViewBranch";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function BranchesList({ branches, onUpdateBranches }) {
  const navigation = useNavigation();
  const [branchList, setBranchList] = useState(branches);

  const handlePress = (branch) => {
    navigation.navigate("Mi Sucursal", {
      branch,
      onDelete: handleDeleteBranch,
    });
  };

  const handleDeleteBranch = (branchId) => {
    const updatedBranches = branchList.filter((branch) => branch.id !== branchId);
    setBranchList(updatedBranches);
    onUpdateBranches && onUpdateBranches(updatedBranches); // Notifica al padre
  };

  return (
    <FlatList
      data={branchList} // Cambiado de `branches` a `branchList`
      renderItem={({ item }) => (
        <BranchItem
          id={item.id}
          name={item.name}
          address={item.address}
          onPress={() => handlePress(item)}
        />
      )}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random())}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 30,
  },
});
