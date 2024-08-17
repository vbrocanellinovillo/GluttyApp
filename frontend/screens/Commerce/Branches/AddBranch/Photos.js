import PhotosForm from "../../../../components/Branch/AddBranchForms/PhotosForm";

export default function Photos({ navigation }) {
  function goBack() {
    navigation.navigate("MapConfirmation");
  }
  
  return <PhotosForm onBack={goBack} />;
}
