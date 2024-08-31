import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function MapSearchSkeleton() {
  const items = Array.from({ length: 5 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item} style={styles.item}>
          <Skeleton circle width={70} height={70} />
          <View style={styles.infoContainer}>
            <Skeleton width={110} height={16} />
            <Skeleton width={180} height={12} />
            <Skeleton width={140} height={18} style={styles.extraInfo} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    flexDirection: "row",
    gap: 10,
  },

  infoContainer: {
    paddingVertical: 4,
    gap: 4,
  },

  extraInfo: {
    borderRadius: 20,
    marginTop: 4
  }
});
