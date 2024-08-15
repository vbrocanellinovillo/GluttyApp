import AddressForm from "../../../../components/Branch/AddBranchForms/AddressForm";

export default function Address({ navigation }) {
  function goBack() {
    navigation.navigate("GeneralInfo");
  }

  function goNext(address, coordinates) {
    navigation.navigate("MapConfirmation", { address, coordinates });
  }

  return <AddressForm onBack={goBack} onNext={goNext} />;
}
