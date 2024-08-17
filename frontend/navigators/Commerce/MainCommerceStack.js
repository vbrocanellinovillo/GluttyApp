import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommerceTabs from "./CommerceTabs";
import AddBranchStack from "./AddBranchStack";
import CommerceDrawer from "./CommerceDrawer";

const Stack = createNativeStackNavigator();

export default function MainCommerceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="CommerceDrawer" component={CommerceDrawer} />
        <Stack.Screen name="AddBranchStack" component={AddBranchStack} />
      </Stack.Navigator>
    
  );
}
