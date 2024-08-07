import { FlatList, StyleSheet, View } from "react-native";
import BranchItem from "./BranchItem";

const BRANCH = [
  { id: 1, name: "Entresano", address: "Bv Illia" },
  { id: 2, name: "Entresano", address: "Bv Illia" },
  { id: 3, name: "Entresano", address: "Bv Illia" },
  { id: 4, name: "Entresano", address: "Bv Illia" },
  { id: 5, name: "Entresano", address: "Bv Illia" },
  { id: 6, name: "Entresano", address: "Bv Illia" },
  { id: 7, name: "Entresano", address: "Bv Illia" },
  { id: 8, name: "Entresano", address: "Bv Illia" },
  { id: 9, name: "Entresano", address: "Bv Illia" },
];

export default function BranchesList() {
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
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 30,
  },
});
