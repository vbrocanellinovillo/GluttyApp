import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../../screens/Community/Feed";
import CommunitySearch from "../../screens/Community/CommunitySearch";

const Stack = createNativeStackNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { paddingTop: 20 },
        animation: "none",
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="CommunitySearch" component={CommunitySearch} />
    </Stack.Navigator>
  );
}
