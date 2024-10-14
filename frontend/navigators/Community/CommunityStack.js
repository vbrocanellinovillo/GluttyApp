import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "../../screens/Community/MainScreen";
import CommunityHeader from "../../components/UI/Header/CommunityHeader";
import Feed from "../../screens/Community/Feed";
import CommunityTopTabs from "./CommunityTopTabs";
import CommunitySearch from "../../screens/Community/CommunitySearch";

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ options, navigation }) => (
          <CommunityHeader options={options} navigation={navigation} />
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
    </Stack.Navigator>
  );
}
