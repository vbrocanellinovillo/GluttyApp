import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditAddress from "../../screens/Commerce/Branches/EditBranch/EditAddress";
import EditPhotos from "../../screens/Commerce/Branches/EditBranch/EditPhotos";
import EditMapConfirmation from "../../screens/Commerce/Branches/EditBranch/EditMapConfirmation";
import EditGeneralInfo from "../../screens/Commerce/Branches/EditBranch/EditGeneralInfo";
import EditBranchHeader from "../../components/UI/Header/EditBranchHeader";

const Stack = createNativeStackNavigator();

export default function EditBranchStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      header: ({ navigation, route, options }) => (
        <EditBranchHeader
          navigation={navigation}
          route={route}
          options={options}
        />
      ),
      animation: "fade",
    }}>
      <Stack.Screen name="EditGeneralInfo" component={EditGeneralInfo} options={{title:"Editar Información General"}}  />
      <Stack.Screen name="EditAddress" component={EditAddress} options={{title:"Editar Dirección"}}/>
      <Stack.Screen name="EditMapConfirmation" component={EditMapConfirmation} options={{title:"Editar Dirección"}}/>
      <Stack.Screen name="EditPhotos" component={EditPhotos} options={{title:"Editar Fotos"}}/>
    </Stack.Navigator>
  );
}