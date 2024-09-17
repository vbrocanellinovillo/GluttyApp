import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";
import { Feather, Entypo } from "@expo/vector-icons";

export default function PdfSkeleton({ style }) {
  return (
    <View style={[styles.item, style]}>
      <View style={styles.file}>
        <Feather style={styles.fileIcon} name="file" size={24} color="#aaa" />
        <View style={styles.textContainer}>
          <Skeleton width={100} height={20} />
          <Skeleton width={40} height={20} />
        </View>
      </View>
      <View style={styles.actionIcons}>
        <Entypo name="eye" size={24} color="#aaa" />
        <Entypo name="squared-cross" size={24} color="#aaa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 3,
    width: "100%",
  },

  file: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  textContainer: {
    gap: 8,
  },

  fileIcon: {
    marginRight: 10,
  },

  actionIcons: {
    flexDirection: "row",
    marginLeft: 15,
    gap: 10,
  },
});
