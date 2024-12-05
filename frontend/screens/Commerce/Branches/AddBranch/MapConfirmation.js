import MapConfirmationForm from "../../../../components/Branch/AddBranchForms/MapConfirmationForm";

export default function MapConfirmation({ navigation, route }) {
  const receivedBranch = route.params.branch;
  const receivedCoordinates = receivedBranch.coordinates;

  function cancel() {
    navigation.navigate("Address", { branch: receivedBranch });
  }

  function save(address, coordinates) {
    receivedBranch.address = address;
    receivedBranch.coordinates = coordinates;
    navigation.navigate("Photos", { branch: receivedBranch });
  }

  if (!receivedCoordinates.latitude || !receivedCoordinates.longitude) {
    // return pantalla de error
  }

  return (
    <MapConfirmationForm
      address={receivedBranch.address}
      coordinates={receivedCoordinates}
      onCancel={cancel}
      onSave={save}
    />
  );
}
