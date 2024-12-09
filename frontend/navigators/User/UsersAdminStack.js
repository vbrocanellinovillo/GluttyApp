import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsersAdmin from "../../screens/User/Admin/UsersAdmin";
import ViewPostsReportedUser from "../../screens/User/Admin/ViewPostsReportedUser";

const Stack = createNativeStackNavigator();

export default function UsersAdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UsersAdmin" component={UsersAdmin} />
      
      <Stack.Screen name="ViewPostsReportedUser" component={ViewPostsReportedUser}/>
    </Stack.Navigator>
  );
}
