import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditAddress from "../../screens/Commerce/Branches/EditBranch/EditAddress";
import EditPhotos from "../../screens/Commerce/Branches/EditBranch/EditPhotos";
import EditGeneralInfo from "../../screens/Commerce/Branches/EditBranch/EditGeneralInfo";
import EditMapConfirmation from "../../screens/Commerce/Branches/EditBranch/EditMapConfirmation";

const Stack = createNativeStackNavigator();

export default function EditBranchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditGeneralInfo" component={EditGeneralInfo} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="EditMapConfirmation" component={EditMapConfirmation}/>
      <Stack.Screen name="EditPhotos" component={EditPhotos} />
    </Stack.Navigator>
  );
}