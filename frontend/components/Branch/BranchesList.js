import { FlatList, StyleSheet } from "react-native";
import BranchItem from "./BranchItem";
import { ViewBranch } from "../../screens/Commerce/Branches/EditBranch/ViewBranch";
import { useNavigation } from "@react-navigation/native";

export default function BranchesList({ branches }) {
  const navigation = useNavigation()

  const handlePress = (branch) => {
    navigation.navigate("Mi Sucursal", {branch});
  };
  
  return (
    <FlatList
      data={branches}
      renderItem={({ item }) => (
        <BranchItem
          id = {item.id}
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
