import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Branches from "../../screens/Commerce/Branches/Branches";
import NewBranch from "../../screens/Commerce/Branches/NewBranch";

const Stack = createNativeStackNavigator();

export default function BranchesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Branches" component={Branches} />
      <Stack.Screen
        name="NewBranch"
        component={NewBranch}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
