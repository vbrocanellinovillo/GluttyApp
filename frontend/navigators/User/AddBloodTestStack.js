import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadExam from "../../screens/User/MedicalExams/AddBloodTest/UploadExam";
import BloodTest from "../../screens/User/MedicalExams/AddBloodTest/BloodTest";
import AddBloodTestHeader from "../../components/UI/Header/AddBloodTestHeader";

const Stack = createNativeStackNavigator();

export default function AddBloodTestStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route, options }) => (
          <AddBloodTestHeader route={route} options={options} />
        ),
        animation: "fade",
      }}
    >
      <Stack.Screen name="UploadExam" component={UploadExam} />
      <Stack.Screen name="BloodTest" component={BloodTest} />
    </Stack.Navigator>
  );
}
