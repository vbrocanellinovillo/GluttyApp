import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { Ionicons } from "@expo/vector-icons";

const MainNav = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <MainNav.Navigator screenOptions={{headerShown: false}}>
      <MainNav.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
    </MainNav.Navigator>
  );
}
