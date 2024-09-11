import { useNavigation } from "@react-navigation/native";
import AddButton from "../UI/Controls/AddButton";

export default function AddBranchButton() {
  const navigation = useNavigation();

  function navigateNewBranch() {
    navigation.navigate("AddBranchStack");
  }

  return <AddButton onPress={navigateNewBranch}>Nueva Sucursal</AddButton>;
}
