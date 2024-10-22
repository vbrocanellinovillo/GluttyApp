import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MyPosts from "../../screens/Community/MyPosts";
import Favourites from "../../screens/Community/Favourites";
import { Colors } from "../../constants/colors";
import { StyleSheet } from "react-native";
import FeedStack from "./FeedStack";

const TopTabs = createMaterialTopTabNavigator();

export default function CommunityTopTabs() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        lazy: true,
      }}
    >
      <TopTabs.Screen
        name="FeedStack"
        component={FeedStack}
        options={{ title: "Explorar" }}
      />
      <TopTabs.Screen
        name="MyPosts"
        component={MyPosts}
        options={{ title: "Mis Posteos" }}
      />
      <TopTabs.Screen
        name="Favourites"
        component={Favourites}
        options={{ title: "Favoritos" }}
      />
    </TopTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderColor: Colors.mJordan,
  },

  tabBarIndicatorStyle: {
    borderColor: Colors.oceanBlue,
    borderWidth: 1.5,
    marginBottom: 4,
    borderRadius: 10,
  },
});
