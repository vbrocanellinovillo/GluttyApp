import { useState } from "react";
import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";
import { updateBranch } from "../../../../services/commerceService";
import { useSelector } from "react-redux";

export default function GeneralInfo({ navigation, route }) {
  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  async function saveUpdatesBranch(
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway
  ) {
    (branch.name = name),
      (branch.phone = phone),
      (branch.optionalPhone = optionalPhone),
      (branch.separatedKitchen = separatedKitchen),
      (branch.onlyTakeAway = onlyTakeAway);

    try {
      setisloading(true);
      console.log("BID" + branch.id);
      const response = await updateBranch(branch, branch.id, token);
      console.log(response);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setisloading(false);
    }
  }

  function cancel() {
    navigation.navigate("CommerceDrawer");
  }

  const branch = route.params.branch;

  return (
    <GeneralInfoForm
      onNext={saveUpdatesBranch}
      onCancel={cancel}
      branch={branch}
    />
  );
}
