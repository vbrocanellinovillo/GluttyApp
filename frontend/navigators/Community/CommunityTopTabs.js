import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feed from "../../screens/Community/Feed";
import MyPosts from "../../screens/Community/MyPosts";
import Favourites from "../../screens/Community/Favourites";

const TopTabs = createMaterialTopTabNavigator();

export default function CommunityTopTabs() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen
        name="Feed"
        component={Feed}
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
