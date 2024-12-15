import { StyleSheet, View } from "react-native";
import { Skeleton } from "@rneui/themed";

export default function RecipesSkeleton() {
  const skeletons = Array.from({ length: 4 }, (_, index) => `Skeleton-${index}`);

  return (
    <View style={styles.container}>
      {skeletons.map((key) => (
        <View key={key} style={styles.skeletonContainer}>
          <Skeleton style={styles.titleSkeleton} />
          <Skeleton style={styles.descriptionSkeleton} />
          <Skeleton style={styles.descriptionSkeleton} />
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
    marginBottom: 24, // Espacio entre tarjetas
    padding: 12,
    backgroundColor: "#E0E0E0", // Fondo similar al gris claro de las tarjetas
    borderRadius: 12,
  },

  titleSkeleton: {
    height: 22,
    borderRadius: 4,
    marginBottom: 12,
  },

  descriptionSkeleton: {
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
});
