import { ScrollView, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function ProductsSkeleton() {
  const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {items.map((item) => (
        <Skeleton key={item} style={styles.skeleton} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  skeleton: {
    borderRadius: 12,
    marginVertical: 16,
    height: 65,
  },

  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 22,
  },

  chipsRadius: {
    borderRadius: 4,
  },
});
