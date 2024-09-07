import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function MenuesSkeleton() {
  const items = Array.from({ length: 20 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View style={styles.container}>
          <Feather style={styles.fileIcon} name="file" size={24} color="#aaa" />
          <View style={styles.textContainer}>
            <Skeleton key={item} style={styles.skeleton} />
          </View>
          <View style={styles.actionIcons}>
            <Entypo name="eye" size={24} color="#aaa" />
            <Entypo name="squared-cross" size={24} color="#aaa" />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    gap: 6,
  },

  textContainer: {
    gap: 8,
  },

  actionIcons: {
    marginLeft: 14,
  },
});
