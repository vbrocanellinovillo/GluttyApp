import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MedicalExams from "../../screens/User/MedicalExams/MedicalExams";
import MedicalStatistics from "../../screens/User/MedicalExams/MedicalStatistics";
import MedicalStatisticsHeader from "../../components/UI/Header/MedicalStatisticsHeader";
import MedicalExamsHeader from "../../components/UI/Header/MedicalExamsHeader";
import ViewMedicalExam from "../../screens/User/MedicalExams/ViewMedicalExam";

const Stack = createNativeStackNavigator();

export default function MedicalExamsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, options, route }) => (
          <MedicalExamsHeader
            navigation={navigation}
            options={options}
            route={route}
          />
        ),
        animation: "fade",
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
        options={{ animation: "fade_from_bottom", title: "Mis Estudios" }}
      />
      <Stack.Screen
        name="ViewMedicalExam"
        component={ViewMedicalExam}
        options={{ title: "Mi estudio" }}
      />
    </Stack.Navigator>
  );
}
