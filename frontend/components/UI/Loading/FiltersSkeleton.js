import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function FiltersSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton width={140} height={50} style={styles.skeleton} />
      <Skeleton width={140} height={50} style={styles.skeleton} />
      <Skeleton width={40} height={50} style={styles.skeleton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 22,
    gap: 24,
  },

  skeleton: {
    borderRadius: 4,
  },
});
