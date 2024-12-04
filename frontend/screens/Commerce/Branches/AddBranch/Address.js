import AddressForm from "../../../../components/Branch/AddBranchForms/AddressForm";
import { Coordinates } from "../../../../models/Coordinates";

export default function Address({ navigation, route }) {
  const recivedBranch = route.params.branch;

  function goBack() {
    navigation.navigate("GeneralInfo", { branch: recivedBranch });
  }

  function goNext(address, coordinates) {
    recivedBranch.address = address;

    const coords = new Coordinates(
      coordinates.latitude,
      coordinates.longitude
    );

    recivedBranch.coordinates = coords;
    navigation.navigate("MapConfirmation", { branch: recivedBranch });
  }

  return <AddressForm onBack={goBack} onNext={goNext} />;
}
