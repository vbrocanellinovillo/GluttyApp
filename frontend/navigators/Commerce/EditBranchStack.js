import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GeneralInfo from "../../screens/Commerce/Branches/EditBranch/EditGeneralInfo";
import EditAddress from "../../screens/Commerce/Branches/EditBranch/EditAddress";
import EditPhotos from "../../screens/Commerce/Branches/EditBranch/EditPhotos";

const Stack = createNativeStackNavigator();

export default function EditBranchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EditGeneralInfo" component={GeneralInfo} />
      <Stack.Screen name="EditAddress" component={EditAddress} />
      <Stack.Screen name="EditPhotos" component={EditPhotos} />
    </Stack.Navigator>
  );
}
