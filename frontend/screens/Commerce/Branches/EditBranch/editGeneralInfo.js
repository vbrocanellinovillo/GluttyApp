import GeneralInfoForm from "../../../../components/Branch/AddBranchForms/GeneralInfoForm";
import { updateBranch } from "../../../../services/commerceService";

export default function GeneralInfo({ navigation, branch }) {
  async function saveUpdatesBranch(
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway
  ) { 
      branch.name = name,
      branch.phone = phone,
      branch.optionalPhone = optionalPhone,
      branch.separatedKitchen = separatedKitchen,
      branch.onlyTakeAway = onlyTakeAway

      try {
        setisloading(true);
        console.log("BID" + branch.id)
        const response = await updateBranch(branch, branch.id,token);
        console.log(response)
        }
        catch (error) {
          setIsError(true);
          setMessage(error.message);
          setShowModal(true);
        } finally {
          setisloading(false);
        }

      }

    //navegar a la pantalla anterior
    //navigation.navigate("Address", { branch: newBranch });

  function cancel() {
    navigation.navigate("CommerceDrawer");
  }

  return <GeneralInfoForm onNext={saveUpdatesBranch} onCancel={cancel} branch={branch} />;
}