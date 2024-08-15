import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GeneralInfo from "../../screens/Commerce/Branches/AddBranch/GeneralInfo";
import Address from "../../screens/Commerce/Branches/AddBranch/Address";
import Photos from "../../screens/Commerce/Branches/AddBranch/Photos";
import AddBranchHeader from "../../components/UI/Header/AddBranchHeader";
import MapConfirmation from "../../screens/Commerce/Branches/AddBranch/MapConfirmation";

const Stack = createNativeStackNavigator();

export default function AddBranchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <AddBranchHeader
            navigation={navigation}
            route={route}
            options={options}
          />
        ),
        animation: "fade",
      }}
    >
      <Stack.Screen
        name="GeneralInfo"
        component={GeneralInfo}
        options={{ title: "Información General" }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{ title: "Dirección" }}
      />
      <Stack.Screen name="MapConfirmation" component={MapConfirmation} />
      <Stack.Screen name="Photos" component={Photos} />
    </Stack.Navigator>
  );
}
