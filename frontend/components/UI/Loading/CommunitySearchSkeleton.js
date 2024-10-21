import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function CommunitySearchSkeleton() {
  const items = Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item} style={styles.item}>
          <Skeleton width={20} height={20} />
          <Skeleton width={100} height={24} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 200,
  },

  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
