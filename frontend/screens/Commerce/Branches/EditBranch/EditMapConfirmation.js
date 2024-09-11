  import MapConfirmationForm from "../../../../components/Branch/AddBranchForms/MapConfirmationForm";
  import { useState } from "react";
  import { updateBranch } from "../../../../services/commerceService";
  import { useSelector } from "react-redux";
  import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
  import GluttyModal from "../../../../components/UI/GluttyModal";

  export default function EditMapConfirmation({ navigation, route }) {
    console.log(route)
    const receivedBranch = route.params?.params?.branch;
    console.log("FUNCA ???")
    console.log(receivedBranch)
    const receivedCoordinates = {latitude: receivedBranch.latitude, longitude: receivedBranch.longitude}
    const [isloading, setisloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const token = useSelector((state) => state.auth.accessToken);

    async function saveUpdatesBranch(
      selectedAddress,
      marker
    ) {
        receivedBranch.latitude = marker.latitude
        receivedBranch.address = selectedAddress
        receivedBranch.longitude = marker.longitude

        console.log("la branch qu emanda")
        console.log(receivedBranch)

      try {
        setisloading(true);
        console.log("Branch" + receivedBranch.id);
        console.log(receivedBranch)
        const response = await updateBranch(receivedBranch, receivedBranch.id, token);
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
      navigation.navigate("EditAddress", { branch: receivedBranch });
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
      <MapConfirmationForm
        address={receivedBranch.address}
        coordinates={receivedCoordinates}
        onCancel={cancel}
        onSave={saveUpdatesBranch}
      />
      </>
    
    );
  }
