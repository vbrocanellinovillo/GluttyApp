import { useState } from "react";
import AddressForm from "../../../../components/Branch/AddBranchForms/AddressForm";
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
    latitude,
    longitude
  ) {
      (branch.latitude = latitude),
      (branch.longitude = longitude);

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

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <LoadingGlutty visible={isloading} />
      <AddressForm
      onNext={saveUpdatesBranch}
      onBack={cancel}
      branch={branch}
      />
    </>

  );
}
