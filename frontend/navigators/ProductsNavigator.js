import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/Products/Products";
import Details from "../screens/Products/Details";

const Stack = createNativeStackNavigator();

export default function ProductsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}
