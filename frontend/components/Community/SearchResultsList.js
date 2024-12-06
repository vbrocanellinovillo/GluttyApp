import { FlatList, StyleSheet } from "react-native";
import SearchResult from "./SearchResult";

export default function SearchResultsList({ results, onSelectResult }) {
  if (!results) return;

  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <SearchResult onPress={onSelectResult} result={item} />
      )}
      keyExtractor={(item) => item?.id_front?.toString()}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 200,
  },
});
