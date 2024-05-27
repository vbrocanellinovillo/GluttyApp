import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Authentication/Login";
import Register from "../screens/Authentication/Register";
import { Colors } from "../constants/colors";

const AuthNav = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthNav.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: Colors.vainilla },
        headerShown: false,
      }}
    >
      <AuthNav.Screen name="Login" component={Login} />
      <AuthNav.Screen name="Register" component={Register} />
    </AuthNav.Navigator>
  );
}
