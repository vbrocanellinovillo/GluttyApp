import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";

export default function BloodTestSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Skeleton height={50} width="80%" />
        <Skeleton height={50} style={{ borderRadius: 10 }} />
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Skeleton height={50} style={{ borderRadius: 8 }} />
        </View>
        <View style={styles.button}>
          <Skeleton height={50} style={{ borderRadius: 8 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 30,
  },

  section: {
    gap: 16,
    alignItems: "center",
  },

  buttons: {
    flexDirection: "row",
    gap: 20,
  },

  button: {
    flex: 1,
  },
});
