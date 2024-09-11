import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalExams from "../../screens/User/MedicalExams/MedicalExams";
//import BloodTest from "../../screens/User/MedicalExams/BloodTest";

const Stack = createNativeStackNavigator();

export default function MedicalExamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicalExams" component={MedicalExams} />
    </Stack.Navigator>
  );
}
