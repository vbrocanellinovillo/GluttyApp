import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Skeleton } from "@rneui/themed";
import FormSectionContainer from "../Forms/FormSectionContainer";

export default function ViewMedicalExamSkeleton() {
  const items = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);

  return (
    <View style={styles.container}>
      <View style={styles.generalData}>
        <View style={styles.options}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color={Colors.darkGray}
          />
        </View>

        <View style={styles.infoEncabezado}>
          <View style={styles.dateBox}>
            <Skeleton width={70} height={70} style={styles.bordered} />
          </View>

          <View style={styles.infoBox}>
            <Skeleton width={120} height={20} />
            <Skeleton width={140} height={20} />
          </View>
        </View>
      </View>
      <Skeleton width="100%" height={50} style={styles.bordered} />
      <View style={styles.titleContainer}>
        <Skeleton width={200} height={30} />
      </View>
      {items.map((item) => (
        <FormSectionContainer key={item}>
          <Skeleton width={120} height={25} />
          <View style={styles.itemContainer}>
            <Skeleton width={250} height={25} style={{ borderRadius: 20 }} />
          </View>
        </FormSectionContainer>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
  },

  generalData: {
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  bordered: {
    borderRadius: 10,
  },

  infoEncabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: -7,
  },

  options: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: 7,
    zIndex: 1500, // Asegura que el menú esté por delante
  },

  dateBox: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 13,
    flex: 1,
    alignItems: "center",
  },

  infoBox: {
    marginLeft: 20, // Espacio entre la fecha y la info
    flex: 3,
    gap: 10,
  },

  titleContainer: {
    alignItems: "flex-start",
  },

  itemContainer: {
    alignItems: "center",
    gap: 20,
  },
});
