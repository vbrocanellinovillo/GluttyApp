import { Text, View } from "react-native";

export default function MapConfirmation({ navigation, route }) {
  const address = route.params.address;
  const coordinates = route.params.coordinates;

  function cancel() {
    navigation.navigate("Address");
  }

  function save() {
    navigation.navigate("Photos");
  }

  return (
    <View>
      <Text>map confirmation</Text>
    </View>
  );
}
