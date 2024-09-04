import Header from "./Header";
import UserImage from "../UserImage/UserImage";
import { DrawerActions } from "@react-navigation/native";
import HeaderTitle from "./HeaderTitle";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {} from "@expo/vector-icons"
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "../../../constants/colors";

export default function MedicalExamsHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  const name = route.name;
  const title = options.title;

  return (
    <Header>
        <View style={styles.container}>
          <HeaderTitle>Mis Estudios</HeaderTitle>
          <TouchableOpacity>
          <Ionicons name="information-circle" size={32} color= {Colors.locro } />
          </TouchableOpacity>
        </View>
    </Header>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 18,
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    }    
})