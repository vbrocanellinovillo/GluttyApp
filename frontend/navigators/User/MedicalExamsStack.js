import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalExams from "../../screens/User/MedicalExams/MedicalExams";
import MedicalStatistics from "../../screens/User/MedicalExams/MedicalStatistics";
import MedicalStatisticsHeader from "../../components/UI/Header/MedicalStatisticsHeader";
import GluttyTips from "../../screens/User/MedicalExams/GluttyTips";
import MedicalExamsHeader from "../../components/UI/Header/MedicalExamsHeader";
import ViewMedicalExam from "../../screens/User/MedicalExams/ViewMedicalExam";

const Stack = createNativeStackNavigator();

export default function MedicalExamsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => (
          <MedicalExamsHeader navigation={navigation} />
        ),
        animation: "fade"
      }}
    >
      <Stack.Screen
        name="MedicalStatistics"
        component={MedicalStatistics}
        options={{ header: () => <MedicalStatisticsHeader /> }}
      />
      <Stack.Screen
        name="MedicalExams"
        component={MedicalExams}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen name="GluttyTips" component={GluttyTips} />
      <Stack.Screen name="ViewMedicalExam" component={ViewMedicalExam} />
    </Stack.Navigator>
  );
}
