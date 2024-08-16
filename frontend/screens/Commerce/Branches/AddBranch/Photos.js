import { Text, View } from "react-native";
import PhotoForm from "C:\Users\franm\OneDrive\Escritorio\Tesis\GluttyApp\frontend\components\Branch\AddBranchForms\PhotoForm.js"

export default function Photos({navigation}) {
  function goBack() {
    navigation.navigate("GeneralInfo");
  }
  return (
    <PhotoForm onBack={goBack}/>
  );
}
