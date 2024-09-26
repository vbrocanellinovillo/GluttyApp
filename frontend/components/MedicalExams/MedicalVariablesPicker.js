import { ScrollView, View } from "react-native";

const VARS = [
  { id: 1, name: "Ig A Anti Transglutaminasa", image: "" },
  { id: 1, name: "Ig G Anti Gliadina Deaminada", image: "" },
  {
    id: 1,
    name: "Hemoglobina",
    image:
      "https://www.flaticon.com/free-icon/hemoglobin_5912067?term=hemoglobin&page=1&position=1&origin=search&related_id=5912067",
  },
  { id: 1, name: "Hematocrito", image: "" },
  { id: 1, name: "Ferritina", image: "" },
  { id: 1, name: "Ferremia", image: "" },
];

export default function MedicalVariablesPicker() {
  return (
    <View>
      <ScrollView></ScrollView>
    </View>
  );
}
