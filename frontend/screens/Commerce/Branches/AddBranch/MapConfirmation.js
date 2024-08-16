import MapConfirmationForm from "../../../../components/Branch/AddBranchForms/MapConfirmationForm";

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
    <MapConfirmationForm
      address={address}
      coordinates={coordinates}
      onCancel={cancel}
      onSave={save}
    />
  );
}
