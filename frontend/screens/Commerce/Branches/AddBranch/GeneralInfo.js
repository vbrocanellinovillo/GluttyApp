import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";

export default function GeneralInfo({ navigation }) {
  function navigateToAddress() {
    navigation.navigate("Address");
  }

  function cancel() {
    navigation.navigate("CommerceTabs");
  }

  return <GeneralInfoForm onNext={navigateToAddress} onCancel={cancel} />;
}
