import MapConfirmationForm from "../../../../components/Branch/AddBranchForms/MapConfirmationForm";
import NuevaSucursalScreen from "../../../../components/Branch/AddBranchForms/PhotoForm";

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
    <NuevaSucursalScreen />
  );
}
