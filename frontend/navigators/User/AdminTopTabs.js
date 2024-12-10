import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Colors } from "../../constants/colors";
import { StyleSheet } from "react-native";
import PostsAdmin from "../../screens/User/Admin/PostsAdmin";
import AdminTabs from "../../components/UI/Navigation/AdminTabs";
import UsersAdmin from "../../screens/User/Admin/UsersAdmin";

const TopTabs = createMaterialTopTabNavigator();

export default function AdminTopTabs() {
  return (
    <TopTabs.Navigator tabBar={(props) => <AdminTabs {...props} />}>
      <TopTabs.Screen name="UsersAdmin" component={UsersAdmin} />
      <TopTabs.Screen name="PostsAdmin" component={PostsAdmin} />
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
