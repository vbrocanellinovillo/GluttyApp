import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Branches from "../../screens/Commerce/Branches/Branches";
import { ViewBranch } from "../../screens/Commerce/Branches/EditBranch/ViewBranch";

const Stack = createNativeStackNavigator();

export default function BranchesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Branches" component={Branches} />
      <Stack.Screen
        name="Mi Sucursal"
        component={ViewBranch}
        options={{ title: "Mi sucursal" }}
      />
    </Stack.Navigator>
  );
}
