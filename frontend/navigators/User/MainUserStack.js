import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScannerHeader from "../../components/Scanner/ScannerHeader";
import Scan from "../../screens/User/Scan/Scan";
import UserDrawer from "./UserDrawer";

const Stack = createNativeStackNavigator();

export default function MainUserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false, gestureDirection: "vertical" }}
    >
      <Stack.Screen
        name="MainDrawer"
        component={UserDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scan}
        options={{
          header: ({ navigation }) => <ScannerHeader navigation={navigation} />,
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}
