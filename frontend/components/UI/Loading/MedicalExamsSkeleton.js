import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function MedicalExamsSkeleton() {
  const items = Array.from({ length: 6 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View style={styles.item} key={item}>
          <View style={styles.elements}>
            <View style={styles.skeletonContainer}>
              <Skeleton width={100} height={20} />
              <Skeleton width={150} height={20} />
            </View>
          </View>
          <View>
            <Entypo name="eye" size={24} color={Colors.mJordan} />
            <Feather name="paperclip" size={24} color={Colors.mJordan} />
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
    alignItems: "center",
    gap: 20,
  },

  skeletonContainer: {
    gap: 10,
  },

  iconsContainer: {
    flexDirection: "row",
    gap: 10
  }
});
