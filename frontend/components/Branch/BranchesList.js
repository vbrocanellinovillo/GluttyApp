import { FlatList, StyleSheet } from "react-native";
import BranchItem from "./BranchItem";

export default function BranchesList({ branches }) {
  const handlePress = (branch) => {
    console.log("Aprieta");
  };
  return (
    <FlatList
      data={branches}
      renderItem={({ item }) => (
        <BranchItem
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
