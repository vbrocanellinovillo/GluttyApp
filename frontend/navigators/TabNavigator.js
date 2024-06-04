import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";

const TabNav = createBottomTabNavigator()

export default function TabNavigator() {
    return <TabNav.Navigator>
        <TabNav.Screen name="Home" component={Home} />
    </TabNav.Navigator>
}