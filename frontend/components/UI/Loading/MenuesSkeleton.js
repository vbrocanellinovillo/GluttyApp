import { Dimensions, StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import PdfSkeleton from "./PdfSkeleton";
import { Divider } from "react-native-paper";

const width = Dimensions.get("window").width;

export default function MenuesSkeleton() {
  const items = Array.from({ length: 4 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <View>
        <Skeleton width={200} height={30} />
        {items.map((item) => (
          <PdfSkeleton key={item} />
        ))}
      </View>
      <Divider />
      <Skeleton width={200} height={30} />
      <Skeleton width={width * 0.9} height={70} />
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
    gap: 12,
  },
});
