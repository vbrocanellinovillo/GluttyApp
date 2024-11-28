import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import MainHeader from "../../components/UI/Header/MainHeader";
import Menu from "../../screens/Commerce/Menu/Menu";
import BranchesStack from "./BranchesStack";
import Profile from "../../screens/Profile/Profile";
import PrivacityAndSecurity from "../../screens/Profile/PrivacityAndSecurity";
import CommunityStack from "../Community/CommunityStack";
import { Dashboard } from "../../screens/Commerce/Dashboard";
import Map from "../../screens/User/Map/Map";
import PrincipalHeader from "../../components/UI/Header/PrincipalHeader";

export default function CommerceTabs() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "home";
        break;
      case "Sucursales":
        icon = "store";
        break;
      case "Menu":
        icon = "clipboard-text";
        break;
      case "Mapa":
        icon = "map-location-dot";
        break;
    }

    const color = routeName === selectedTab ? Colors.mJordan : Colors.locro;

    return (
      <>
        {routeName === "Mapa" ? (
          <FontAwesome6 name="map-location-dot" size={22} color={color} />
        ) : (
          <MaterialCommunityIcons name={icon} size={25} color={color} />
        )}
      </>
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
      initialRouteName="Estadísticas"
      renderCircle={({ selectedTab, navigate }) => {
        const isDashboard = selectedTab === "Estadísticas";
        return (
          <View style={styles.btnCircleUp}>
            <TouchableOpacity onPress={() => navigate("Estadísticas")}>
              <MaterialIcons
                name="insights"
                color={isDashboard ? Colors.mJordan : Colors.locro}
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
        name="Estadísticas"
        component={Dashboard}
        position="CIRCLE"
        options={{
          header: ({ navigation, options }) => (
            <PrincipalHeader navigation={navigation} options={options} />
          ),
        }}
      />
      <CurvedBottomBarExpo.Screen
        name="Home"
        component={CommunityStack}
        options={{ headerShown: false }}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="Sucursales"
        component={BranchesStack}
        position="LEFT"
        options={{ title: "Mis Sucursales" }}
      />
      <CurvedBottomBarExpo.Screen
        name="Menu"
        position="RIGHT"
        component={Menu}
      />
      <CurvedBottomBarExpo.Screen
        name="Mapa"
        position="RIGHT"
        component={Map}
        options={{
          headerShown: false,
        }}
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
