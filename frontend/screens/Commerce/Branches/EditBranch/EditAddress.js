import { useState } from "react";
import AddressForm from "../../../../components/Branch/AddBranchForms/AddressForm";
import { updateBranch } from "../../../../services/commerceService";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../../components/UI/GluttyModal";

export default function EditAddress({ navigation, route }) {
  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  // Verificar que `branch` está correctamente definido
  const branch = route.params?.branch;
  console.log("LA BRANCH ES ESTA:   ", branch);

  function cancel() {
    navigation.navigate("CommerceDrawer");
  }

  // Cambiado para usar el `branch` de `route.params` directamente
  function goNext(address, coordinates) {
    branch.address = address
    branch.latitude = coordinates.latitude
    branch.longitude = coordinates.longitude
    navigation.navigate("EditMapConfirmation", { params: { branch } });
  }

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
        onNext={goNext}
        onBack={cancel}
        branch={branch} // Pasando `branch` a `AddressForm`
      />
    </>
  );
}
