import { useState } from "react";
import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";
import { updateBranch } from "../../../../services/commerceService";
import { useDispatch, useSelector } from "react-redux";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../../components/UI/GluttyModal";
import { commerceActions } from "../../../../context/commerce";

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
    onlyTakeAway,
    schedules
  ) {
    (branch.name = name),
      (branch.phone = phone),
      (branch.optionalPhone = optionalPhone),
      (branch.separatedKitchen = separatedKitchen),
      (branch.onlyTakeAway = onlyTakeAway),
      (branch.schedules = schedules),
      (branch.photos = undefined)


    try {
      console.log("lo que mando a actualizarrr")
      console.log(branch)
      setisloading(true);
      console.log("Branch" + branch.id);
      console.log(branch)
      const response = await updateBranch(branch, branch.id, token);
      setMessage(response.detail);
      setShowModal(true);
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
  const dispatch = useDispatch()
  console.log("branchquemandoyo")
  console.log(branch)

  function closeModalHandler() {
    setShowModal(false);
    if (!isError) {
      dispatch(commerceActions.updateBranch({branch}))
      navigation.navigate("CommerceDrawer");
    }
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
      <GeneralInfoForm
      onNext={saveUpdatesBranch}
      onCancel={cancel}
      branch={branch}
      />
    </>

  );
}
