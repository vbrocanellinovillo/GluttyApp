import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

export default function ViewBranchSkeleton() {
  return (
    <View>
      <Skeleton style={styles.titleSkeleton} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Skeleton style={styles.detailTitleSkeleton} />
          <AntDesign name="edit" size={24} color="#aaa" />
        </View>
        <View style={styles.controlsContainer}>
          <Skeleton style={styles.formControlSkeleton} />
          <Skeleton style={styles.formControlSkeleton} />
          <Skeleton style={styles.formControlSkeleton} />
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Feather name="square" size={24} color="#aaa" />
              <Skeleton style={styles.checkboxSkeleton} />
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Feather name="square" size={24} color="#aaa" />
              <Skeleton style={styles.checkboxSkeleton} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Skeleton style={styles.detailTitleSkeleton} />
          <AntDesign name="edit" size={24} color="#aaa" />
        </View>
        <Skeleton style={styles.formControlSkeleton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSkeleton: {
    width: 120,
    height: 30,
    marginTop: 20,
    marginLeft: 25,
  },

  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: -10,
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 2,
    margin: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
  },

  detailTitleSkeleton: {
    marginTop: 5,
    marginBottom: 10,
    height: 20,
    width: 120,
  },

  controlsContainer: {
    gap: 20,
    paddingLeft: 20,
    marginTop: 10,
  },

  formControlSkeleton: {
    width: 230,
    height: 50,
    borderRadius: 8,
  },

  checkboxContainer: {
    gap: 20,
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "75%",
    borderWidth: 1,
    borderColor: "lightgrey",
  },

  checkboxSkeleton: {
    width: 170,
    height: 40,
  },
});
