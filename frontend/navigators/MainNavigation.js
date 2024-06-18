import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Map from "../screens/Map";
import Recipes from "../screens/Recipes";
import Products from "../screens/Products";
import { useNavigation } from "@react-navigation/native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import Scan from "../screens/Scan";

function HeaderLeft() {
  const navigation = useNavigation();

  function navigateHandler() {
    navigation.navigate("Usuario");
  }

  return (
    <TouchableOpacity onPress={navigateHandler}>
      <View style={styles.headerLeft}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg",
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
}

export default function MainNavigation() {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "home";
        break;
      case "Recetas":
        icon = "list";
        break;
      case "Productos":
        icon = "fast-food";
        break;
      case "Mapa":
        icon = "map";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? Colors.mJordan : Colors.oceanBlue}
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
              : { color: Colors.oceanBlue },
          ]}
        >
          {routeName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      screenOptions={{ headerLeft: () => <HeaderLeft /> }}
      type="DOWN"
      borderTopLeftRight
      bgColor={Colors.humita}
      initialRouteName="Home"
      renderCircle={({ selectedTab, navigate }) => {
        const isScanner = selectedTab === "Escaner";
        return (
          <View style={styles.btnCircleUp}>
            <TouchableOpacity onPress={() => navigate("Escaner")}>
              <Ionicons
                name="scan"
                color={isScanner ? Colors.mJordan : Colors.oceanBlue}
                size={25}
              />
            </TouchableOpacity>
          </View>
        );
      }}
      tabBar={renderTabBar}
      height={80}
      sceneContainerStyle={{backgroundColor: "white"}}
    >
      <CurvedBottomBarExpo.Screen
        name="Home"
        component={Home}
        position="LEFT"
        options={{}} 
      />
      <CurvedBottomBarExpo.Screen
        name="Recetas"
        component={Recipes}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="Escaner"
        position="CIRCLE"
        component={Scan}
      />
      <CurvedBottomBarExpo.Screen
        name="Productos"
        position="RIGHT"
        component={Products}
      />
      <CurvedBottomBarExpo.Screen
        name="Mapa"
        position="RIGHT"
        component={Map}
      />
      <CurvedBottomBarExpo.Screen
        name="Usuario"
        component={Profile}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    bottom: 10,
    left: 20,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    objectFit: "fill",
  },

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
    fontWeight: "600"
  },
});
