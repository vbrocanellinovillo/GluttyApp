import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../../screens/Community/MainScreen";
import CommunityTopTabs from "./CommunityTopTabs";
import ViewPostById from "../../screens/Community/ViewPostById";
import PrincipalHeader from "../../components/UI/Header/PrincipalHeader";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ options, navigation }) => (
          <PrincipalHeader options={options} navigation={navigation} />
        ),
        animation: "fade",
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="CommunityTopTabs"
        component={CommunityTopTabs}
        options={{ title: "Feed" }}
      />
      <Stack.Screen name="ViewPostById" component={ViewPostById} />
    </Stack.Navigator>
  );
}
