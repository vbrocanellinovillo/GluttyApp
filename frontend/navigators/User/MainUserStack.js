import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScannerHeader from "../../components/Scanner/ScannerHeader";
import Scan from "../../screens/User/Scan/Scan";
import UserDrawer from "./UserDrawer";
import AddBloodTestStack from "./AddBloodTestStack";
import MedicalStatistics from "../../screens/User/MedicalExams/MedicalStatistics";
import EditBloodTestStack from "./EditBloodTestStack";
import AddPost from "../../screens/Community/AddPost";
import AddPostHeader from "../../components/UI/Header/AddPostHeader";

const Stack = createNativeStackNavigator();

export default function MainUserStack() {
  return (
    <Stack.Navigator
      screenOptions={{ gestureEnabled: false, gestureDirection: "vertical" }}
    >
      <Stack.Screen
        name="MainDrawer"
        component={UserDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Scanner"
        component={Scan}
        options={{
          header: ({ navigation }) => <ScannerHeader navigation={navigation} />,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="AddBloodTestStack"
        component={AddBloodTestStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditBloodTestStack"
        component={EditBloodTestStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          header: ({ navigation, options, route }) => (
            <AddPostHeader
              navigation={navigation}
              options={options}
              route={route}
            />
          ),
          title: "Nuevo Post",
        }}
      />
    </Stack.Navigator>
  );
}
