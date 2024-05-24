import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Authentication/Login";
import Register from "./screens/Authentication/Register";
import { Colors } from "./constants/colors";

const AuthNav = createNativeStackNavigator();

function AuthNavigation() {
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

export default function Index() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
