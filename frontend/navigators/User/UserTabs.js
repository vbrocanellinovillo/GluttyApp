import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import MainHeader from "../../components/UI/Header/MainHeader";
import Products from "../../screens/User/Products/Products";
import Map from "../../screens/User/Map/Map";
import Profile from "../../screens/Profile/Profile";
import PrivacityAndSecurity from "../../screens/Profile/PrivacityAndSecurity";
import MedicalExamsStack from "./MedicalExamsStack";
import CommunityStack from "../Community/CommunityStack";
import Recipes from "../../screens/User/Chatbot/Recipes";
import MyRecipes from "../../screens/User/Chatbot/MyRecipes";
import AdminTopTabs from "./AdminTopTabs";
import SecondaryHeader from "../../components/UI/Header/SecondaryHeader";
import AdminStack from "./AdminStack";

export default function UserTabs() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "house-chimney";
        break;
      case "Recetas":
        icon = "receipt";
        break;
      case "Estudios":
        icon = "notes-medical";
        break;
      case "Mapa":
        icon = "map-location-dot";
        break;
    }

    return (
      <FontAwesome6
        name={icon}
        size={22}
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
        const isScanner = selectedTab === "Escaner";
        return (
          <View style={styles.btnCircleUp}>
            <TouchableOpacity onPress={() => navigate("Scanner")}>
              <Ionicons
                name="scan"
                color={isScanner ? Colors.mJordan : Colors.locro}
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
        name="Home"
        component={CommunityStack}
        position="LEFT"
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="Recetas"
        component={Recipes}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen name="Escaner" position="CIRCLE" />
      <CurvedBottomBarExpo.Screen
        name="Estudios"
        position="RIGHT"
        component={MedicalExamsStack}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen
        name="Mapa"
        position="RIGHT"
        component={Map}
        options={{ headerShown: false }}
      />
      <CurvedBottomBarExpo.Screen name="Productos" component={Products} />

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
        name="MyRecipes"
        component={MyRecipes}
        options={{ title: "Mis Recetas" }}
      />
      <CurvedBottomBarExpo.Screen
        name="AdminTopTabs"
        component={AdminTopTabs}
        options={{
          title: "Reportes",
          header: ({ navigation, route, options }) => (
            <SecondaryHeader
              navigation={navigation}
              route={route}
              options={options}
            />
          ),
        }}
      />
      <CurvedBottomBarExpo.Screen
        name="AdminStack"
        component={AdminStack}
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
