import { FlatList, StyleSheet } from "react-native";
import SearchResult from "./SearchResult";

export default function SearchResultsList({ results, onSelectTag }) {
  if (!results) return;

  return (
    <FlatList
      data={results}
      renderItem={({ item }) => (
        <SearchResult onPress={onSelectTag} tag={item} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
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
