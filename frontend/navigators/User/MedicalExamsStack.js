import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalExamsInfo from "../../screens/User/MedicalExams/MedicalExamsInfo";
import MedicalExams from "../../screens/User/MedicalExams/MedicalExams";
import BloodTest from "../../screens/User/MedicalExams/BloodTest";

const Stack = createNativeStackNavigator();

export default function MedicalExamsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MedicalExams" component={MedicalExams} />
      <Stack.Screen
        name="MedicalExamsInfo"
        component={MedicalExamsInfo}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="BloodTest" component={BloodTest}/>
    </Stack.Navigator>
  );
}
