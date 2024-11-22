import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddBranchStack from "./AddBranchStack";
import CommerceDrawer from "./CommerceDrawer";
import EditBranchStack from "./EditBranchStack";
import { Dashboard } from "../../screens/Commerce/Dashboard";

const Stack = createNativeStackNavigator();

export default function MainCommerceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommerceDrawer" component={CommerceDrawer} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddBranchStack" component={AddBranchStack} />
      <Stack.Screen name="EditBranchStack" component={EditBranchStack} />
    </Stack.Navigator>
  );
}
