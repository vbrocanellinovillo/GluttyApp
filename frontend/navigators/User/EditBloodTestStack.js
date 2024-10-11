import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddBloodTestHeader from "../../components/UI/Header/AddBloodTestHeader";
import EditBloodTest from "../../screens/User/MedicalExams/EditBloodTest/EditBloodTest";
import GoBackHeader from "../../components/UI/Header/GoBackHeader";
import { Title } from "react-native-paper";
const Stack = createNativeStackNavigator();

export default function EditBloodTestStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route, options, navigation }) => (
         <GoBackHeader route={route} options={options} navigation={navigation}/>
        ),
        animation: "fade",
      }}
    >
      <Stack.Screen name="EditBloodTest" component={EditBloodTest} options={{title: "Editar tu estudio"}}/>
    </Stack.Navigator>
  );
}
