import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewPostsReportedUser from "../../screens/User/Admin/ViewPostsReportedUser";
import AdminStackHeader from "../../components/UI/Header/AdminStackHeader";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ViewPostsReportedUser"
        component={ViewPostsReportedUser}
        options={{
          header: ({ navigation, options, route }) => (
            <AdminStackHeader
              navigation={navigation}
              options={options}
              route={route}
              backScreen="UsersAdmin"
              customText={"Posteos del usuario:"}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
