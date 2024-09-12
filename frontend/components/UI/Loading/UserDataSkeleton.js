import { Skeleton } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import Form from "../Forms/Form";

export default function UserDataSkeleton() {
  const items = Array.from({ length: 4 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <Skeleton style={styles.imageSkeleton} />
      <Form style={styles.formSkeleton}>
        {items.map((item) => (
          <Skeleton key={item} style={styles.formControlSkeleton} />
        ))}
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: "center",
  },

  imageSkeleton: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },

  formSkeleton: {
    marginTop: 40,
    gap: 30,
  },

  formControlSkeleton: {
    width: "100%",
    height: 60,
    borderRadius: 8,
  },
});
