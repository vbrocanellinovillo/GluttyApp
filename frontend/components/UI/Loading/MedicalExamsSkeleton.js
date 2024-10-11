import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

export default function MedicalExamsSkeleton() {
  const items = Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View style={styles.item} key={item}>
          <View style={styles.elements}>
            <View style={styles.date}>
              <Skeleton width={50} height={20} />
              <Skeleton width={50} height={20} />
              <Skeleton width={50} height={20} />
            </View>
            <View style={styles.text}>
              <Skeleton width={100} height={25} />
              <Skeleton width={120} height={25} />
            </View>
          </View>
          <View>
            <Skeleton width={90} height={30} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    gap: 35,
    paddingBottom: 200,
  },

  item: {
    borderRadius: 8,
    flexDirection: "row",
    shadowColor: "#222",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "white",
    gap: 20,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  elements: {
    flexDirection: "row",
    gap: 20,
  },

  date: {
    gap: 4,
  },

  text: {
    justifyContent: "center",
    gap: 10,
  },
});
