import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import TextCommonsMedium from "../../UI/FontsTexts/TextCommonsMedium";

export default function MapConfirmationForm({
  address,
  coordinates,
  onCancel,
  onSave,
}) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}></MapView>
      <View style={styles.bottomOptions}>
        <TextCommonsMedium>nose</TextCommonsMedium>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },

  map: {
    flex: 4,
  },

  bottomOptions: {
    flex: 2,
    backgroundColor: "red",
    borderRadius: 20,
  },
});
