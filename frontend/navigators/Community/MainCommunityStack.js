import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPost from "../../screens/Community/AddPost";
import AddPostHeader from "../../components/UI/Header/AddPostHeader";
import CommunityImages from "../../screens/Community/CommunityImages";

const Stack = createNativeStackNavigator();

export default function MainCommunityStack() {
  return (
    <Stack.Navigator>
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
          title: "Nuevo",
        }}
      />
      <Stack.Screen
        name="CommunityImages"
        component={CommunityImages}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
