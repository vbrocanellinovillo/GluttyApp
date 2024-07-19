import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainDrawer from "./MainDrawer";
import Scan from "../screens/Scan/Scan";
import ScannerHeader from "../components/Scanner/ScannerHeader";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false, gestureDirection: "vertical" }}
    >
      <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
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
