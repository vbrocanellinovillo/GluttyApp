import { Text, View } from "react-native";
import MapConfirmationForm from "../../../../components/Branch/AddBranchForms/MapConfirmationForm";

export default function MapConfirmation({ navigation, route }) {
  const address = route.params.address;
  const coordinates = route.params.coordinates;

  function goBack() {
    navigation.navigate("Address");
  }

  function save() {
    navigation.navigate("Photos");
  }

  return (
    <MapConfirmationForm
      address={address}
      coordinates={coordinates}
      onBack={goBack}
      onSave={save}
    />
  );
}
