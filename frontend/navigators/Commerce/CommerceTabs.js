import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import MainHeader from "../../components/UI/Header/MainHeader";
import Menu from "../../screens/Commerce/Menu/Menu";
import BranchesStack from "./BranchesStack";
import Profile from "../../screens/Profile/Profile";
import PrivacityAndSecurity from "../../screens/Profile/PrivacityAndSecurity";
import CommunityStack from "../Community/CommunityStack";

export default function CommerceTabs() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Sucursales":
        icon = "store";
        break;
      case "Menu":
        icon = "clipboard-text";
        break;
    }

    return (
      <MaterialCommunityIcons
        name={icon}
        size={25}
        color={routeName === selectedTab ? Colors.mJordan : Colors.locro}
      />
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarItem}
      >
        {_renderIcon(routeName, selectedTab)}
        <Text
          style={[
            styles.tabText,
            selectedTab === routeName
              ? { color: Colors.mJordan }
              : { color: Colors.locro },
          ]}
        >
          {routeName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <MainHeader navigation={navigation} route={route} options={options} />
        ),
      }}
      type="DOWN"
      borderTopLeftRight
      bgColor={Colors.humita}
      initialRouteName="Home"
      renderCircle={({ selectedTab, navigate }) => {
        const isCommunity = selectedTab === "CommunityStack";
        return (
          <View style={styles.btnCircleUp}>
            <TouchableOpacity onPress={() => navigate("CommunityStack")}>
              <MaterialIcons
                name="groups"
                color={isCommunity ? Colors.mJordan : Colors.locro}
                size={25}
              />
            </TouchableOpacity>
          </View>
        );
      }}
      tabBar={renderTabBar}
      height={80}
    >
      <CurvedBottomBarExpo.Screen
        name="Sucursales"
        component={BranchesStack}
        position="LEFT"
        options={{ title: "Mis Sucursales" }}
      />
      <CurvedBottomBarExpo.Screen name="Community" position="CIRCLE" />
      <CurvedBottomBarExpo.Screen
        name="Menu"
        position="RIGHT"
        component={Menu}
      />
      <CurvedBottomBarExpo.Screen
        name="UserData"
        component={Profile}
        options={{ title: "Mis datos" }}
      />
      <CurvedBottomBarExpo.Screen
        name="PrivacityAndSecurity"
        component={PrivacityAndSecurity}
        options={{ title: "Privacidad y Seguridad" }}
      />
      <CurvedBottomBarExpo.Screen
        name="CommunityStack"
        component={CommunityStack}
        options={{ headerShown: false }}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
  },

  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.vainilla,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    bottom: 18,
  },

  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabText: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "600",
  },
});
