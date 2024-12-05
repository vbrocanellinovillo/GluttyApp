import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Authentication/Login";
import Register from "../../screens/Authentication/Register";
import { Colors } from "../../constants/colors";
import InitialScreen from "../../screens/Authentication/InitialScreen";
import { ImageBackground } from "react-native";
import { EmailVerification } from "../../screens/Authentication/EmailVerification";
import { ForgotPassword } from "../../screens/Authentication/ForgotPassword";
import ChangePassword from "../../screens/Authentication/ChangePassword";

const AuthNav = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthNav.Screen name="Initial" component={InitialScreen} />
      <AuthNav.Screen name="Login" component={Login} />
      <AuthNav.Screen name="Register" component={Register} />
      <AuthNav.Screen name="EmailVerification"
        component={EmailVerification}
      />
      <AuthNav.Screen name="ChangePassword" component={ChangePassword}/>
      <AuthNav.Screen name="ForgotPassword"
        component={ForgotPassword}
      />
    </AuthNav.Navigator>
    
  );
}
