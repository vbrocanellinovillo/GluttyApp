import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import PdfSkeleton from "./PdfSkeleton";
import { Divider } from "react-native-paper";

export default function MenuesSkeleton() {
  const items = Array.from({ length: 2 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <View>
        <Skeleton width={200} height={30} />
        {items.map((item) => (
          <PdfSkeleton key={item} />
        ))}
      </View>
      <Divider />
      <View>
        <Skeleton width={200} height={30} />
        {items.map((item) => (
          <PdfSkeleton key={item} />
        ))}
        <View style={styles.buttonsSkeletonContainer}>
          <Skeleton width="100%" height={30} />
          <Skeleton width={140} height={30} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    marginBottom: 240,
    gap: 20,
  },

  buttonsSkeletonContainer: {
    alignItems: "center",
    marginTop: 16,
    gap: 12
  },
});
