import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersAdmin from "../../screens/User/Admin/UsersAdmin";

const Stack = createNativeStackNavigator();

export default function UsersAdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UsersAdmin" component={UsersAdmin} />
    </Stack.Navigator>
  );
}
