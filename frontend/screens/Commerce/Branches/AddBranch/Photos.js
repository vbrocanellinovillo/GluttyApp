import PhotosForm from "../../../../components/Branch/AddBranchForms/PhotosForm";

export default function Photos({ navigation, route }) {
  const receivedBranch = route.params.branch;

  function goBack() {
    navigation.navigate("MapConfirmation", { branch: receivedBranch });
  }

  return <PhotosForm onBack={goBack} />;
}
