import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";
import { Branch } from "../../../../models/Branch";

export default function GeneralInfo({ navigation }) {
  function navigateToAddress(
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway,
    schedules,
  ) {
    const newBranch = new Branch(
      name,
      phone,
      optionalPhone,
      separatedKitchen,
      onlyTakeAway,
      schedules
    );
    navigation.navigate("Address", { branch: newBranch });
  }

  function cancel() {
    navigation.navigate("CommerceDrawer");
  }

  return <GeneralInfoForm onNext={navigateToAddress} onCancel={cancel} />;
}
