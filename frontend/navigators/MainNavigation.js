import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import MainUserStack from "./User/MainUserStack";
import MainCommerceStack from "./Commerce/MainCommerceStack";
import MainCommunityStack from "./Community/MainCommunityStack";
import PdfScreen from "../screens/Pdf/PdfScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  const isCommerce = useSelector((state) => state.auth?.isCommerce);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Main"
        component={isCommerce ? MainCommerceStack : MainUserStack}
      />
      <Stack.Screen
        name="MainCommunityStack"
        component={MainCommunityStack}
        options={{
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{ headerShown: true, headerBackTitle: "Volver" }}
      />
    </Stack.Navigator>
  );
}
