import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddBloodTestHeader from "../../components/UI/Header/AddBloodTestHeader";
import EditBloodTest from "../../screens/User/MedicalExams/EditBloodTest/EditBloodTest";

const Stack = createNativeStackNavigator();

export default function EditBloodTestStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route, options }) => (
          <AddBloodTestHeader route={route} options={options} />
        ),
        animation: "fade",
      }}
    >
      <Stack.Screen name="EditBloodTest" component={EditBloodTest} />
    </Stack.Navigator>
  );
}
