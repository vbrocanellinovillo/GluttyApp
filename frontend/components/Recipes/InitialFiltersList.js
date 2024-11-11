import { Dimensions, FlatList, StyleSheet } from "react-native";
import { INITIAL_FILTERS } from "../../constants/chatbot";
import InitialFilter from "./InitialFilter";

const width = Dimensions.get("window").width;

export default function InitialFiltersList({ onFilter }) {
  return (
    <FlatList
      data={INITIAL_FILTERS}
      renderItem={({ item }) => (
        <InitialFilter filter={item.prompt} onPress={onFilter} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      bounces={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: width * 0.05,
    gap: 30,
  },
});
