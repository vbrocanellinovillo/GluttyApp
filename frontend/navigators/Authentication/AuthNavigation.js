import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Authentication/Login";
import Register from "../../screens/Authentication/Register";
import { Colors } from "../../constants/colors";
import InitialScreen from "../../screens/Authentication/InitialScreen";
import { ImageBackground } from "react-native";
import { EmailVerification } from "../../screens/Authentication/EmailVerification";
import ChangePassword from "../../screens/Authentication/ChangePassword";
import PasswordCodeVerification from "../../screens/Authentication/PasswordCodeVerification"; 

import SetNewPassword from "../../screens/Authentication/SetNewPassword"; 


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
      <AuthNav.Screen
        name="PasswordCodeVerification" // Agrega la nueva pantalla aquí
        component={PasswordCodeVerification}
      />
      <AuthNav.Screen
        name="SetNewPassword" // Agrega la nueva pantalla aquí
        component={SetNewPassword}
      />
      
    </AuthNav.Navigator>
    
  );
}
