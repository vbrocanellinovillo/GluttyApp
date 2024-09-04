import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function MedicalExamsStack() {
    return <Stack.Navigator>
        <Stack.Screen name="MedicalExams" component={MedicalExams} />
        <Stack.Screen name="MedicalExamsInfo" component={MedicalExamsInfo} options={{presentation: "modal"}}/>
    </Stack.Navigator>
} 