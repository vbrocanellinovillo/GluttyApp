import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function ReportedUserSkeleton() {
  const skeletons = Array.from({ length: 5 }, (_, index) => `Skeleton-${index}`);

  return (
    <View style={styles.container}>
      {skeletons.map((key) => (
        <View key={key} style={styles.skeletonContainer}>
          {/* Imagen circular */}
          <Skeleton style={styles.circleSkeleton} />

          {/* Contenedor de texto */}
          <View style={styles.textContainer}>
            <Skeleton style={styles.titleSkeleton} />
            <Skeleton style={styles.subtitleSkeleton} />
          </View>

          {/* Ícono de advertencia */}
          <Skeleton style={styles.iconSkeleton} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },

  circleSkeleton: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hace el esqueleto circular
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  titleSkeleton: {
    height: 18,
    borderRadius: 4,
    marginBottom: 8,
    width: "60%",
  },

  subtitleSkeleton: {
    height: 14,
    borderRadius: 4,
    width: "40%",
  },

  iconSkeleton: {
    width: 20,
    height: 20,
    borderRadius: 10, // Ícono circular
  },
});
