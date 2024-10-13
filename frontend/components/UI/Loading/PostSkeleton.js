import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import { Divider } from "react-native-paper";

export default function PostSkeleton({ curved }) {
  return (
    <>
      <View style={[styles.container, curved && styles.curved]}>
        <View style={styles.nameContainer}>
          <Skeleton circle width={40} height={40} />
          <Skeleton width={120} height={25} />
          <Skeleton width={100} height={15} />
        </View>
        <View style={styles.contentContainer}>
          <Skeleton width="95%" height={18} />
          <Skeleton width="95%" height={18} />
          <Skeleton width="55%" height={18} />
        </View>
        <View style={styles.tagsContainer}>
          <Skeleton width={70} height={25} style={styles.curvedElement} />
          <Skeleton width={70} height={25} style={styles.curvedElement} />
          <Skeleton width={70} height={25} style={styles.curvedElement} />
        </View>
        <View style={styles.infoContainer}>
          <Skeleton width={80} height={20} />
          <View style={styles.postInfoContainer}>
            <Skeleton width={85} height={25} style={styles.curvedElement} />
            <Skeleton width={85} height={25} style={styles.curvedElement} />
          </View>
        </View>
      </View>
      {!curved && <Divider />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  curved: {
    borderRadius: 18,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  contentContainer: {
    gap: 10,
  },

  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  curvedElement: {
    borderRadius: 30,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  postInfoContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
