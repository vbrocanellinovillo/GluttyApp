import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Map from "../screens/Map";
import Recipes from "../screens/Recipes";
import Products from "../screens/Products";
import { useNavigation } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

function HeaderLeft() {
  const navigation = useNavigation();

  function navigateHandler() {
    navigation.navigate("Usuario");
  }

  return (
    <TouchableOpacity onPress={navigateHandler}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerText}>US</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function MainNavigation() {
  return (
    <Tabs.Navigator screenOptions={{ headerLeft: () => <HeaderLeft /> }}>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen
        name="Usuario"
        component={Profile}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tabs.Screen name="Map" component={Map} />
      <Tabs.Screen name="Products" component={Products} />
      <Tabs.Screen name="Recipes" component={Recipes} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingHorizontal: 30,
  },

  headerText: {
    fontSize: 24,
  },
});
