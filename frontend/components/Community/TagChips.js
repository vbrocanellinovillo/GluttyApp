import { StyleSheet, View } from "react-native";
import TagChip from "./TagChip";

export default function TagChips({ tags = [], onDeleteTag }) {
  if (!tags || tags.length === 0) return;

  return (
    <View style={styles.container}>
      {tags.map((tag) => (
        <TagChip tag={tag} key={tag.id} onPress={onDeleteTag} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
