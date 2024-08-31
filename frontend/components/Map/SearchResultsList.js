import { FlatList, StyleSheet } from "react-native";
import SearchResultItem from "./SearchResultItem";
import MapSearchSkeleton from "../UI/Loading/MapSearchSkeleton";

export default function SearchResultsList({ searchResults, isLoading }) {
  if (isLoading) return <MapSearchSkeleton />;

  if (!searchResults && !isLoading) return <></>;

  return (
    <>
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => <SearchResultItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  resultsList: {
    gap: 12,
    paddingBottom: 10,
  },
});
