import { Dimensions, StyleSheet, View } from "react-native";
import SectionContainer from "../SectionContainer";
import { Skeleton } from "@rneui/themed";
import GraphicSkeleton from "./GraphicSkeleton";

export default function DashboardSkeleton() {
  const items = Array.from({ length: 4 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <View style={styles.comboContainer}>
        <Skeleton width={300} height={40} borderRadius={10} />
        <Skeleton width={50} height={100} />
      </View>

      <View style={styles.iconsContainer}>
        <Skeleton style={styles.box}></Skeleton>
        <Skeleton style={styles.box}></Skeleton>
        <Skeleton style={styles.box}></Skeleton>
      </View>

      <View style={styles.ranks}>
        <View style={styles.rankedContainer}>
          <Skeleton width={170} height={160} borderRadius={10}></Skeleton>
        </View>
        <View style={styles.rankedContainer}>
          <Skeleton width={170} height={160} borderRadius={10}></Skeleton>
        </View>
      </View>
      <View>
        <Skeleton width={350} height={280} borderRadius={10}></Skeleton>
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

  comboContainer: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  buttonsSkeletonContainer: {
    alignItems: "center",
    marginTop: 16,
    gap: 12,
  },

  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  box: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  ranks: {
    flexDirection: "row",
    gap: 20,
  },

  rankedContainer: {
    flex: 1,
  },
});
