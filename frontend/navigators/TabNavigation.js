import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { useRoute } from "@react-navigation/native";

const TabNav = createBottomTabNavigator();

export default function TabNavigation({ initialRoute }) {
  const router = useRoute();
  const name = router.name;

  const route = name.substring(6);

  console.log(route);
  console.log(router.name);

  return (
    <TabNav.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={route}
    >
      <TabNav.Screen name="Home" component={Home} />
      <TabNav.Screen name="Otro" component={Home} />
      <TabNav.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarItemStyle: { position: "absolute", display: "none" },
        }}
      />
    </TabNav.Navigator>
  );
}
