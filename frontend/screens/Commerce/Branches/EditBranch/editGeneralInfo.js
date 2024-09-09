import { useState } from "react";
import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";
import { updateBranch } from "../../../../services/commerceService";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../../components/UI/GluttyModal";

export default function EditGeneralInfo({ navigation, route }) {
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
      console.log("Branch" + branch.id);
      console.log(branch)
      const response = await updateBranch(branch, branch.id, token);
      console.log("La response: ")
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


  function closeModalHandler() {
    setShowModal(false);
  }

  console.log("error de booleans: ")
  console.log(branch)
  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <LoadingGlutty visible={isloading} />
      <GeneralInfoForm
      onNext={saveUpdatesBranch}
      onCancel={cancel}
      branch={branch}
      />
    </>

  );
}
