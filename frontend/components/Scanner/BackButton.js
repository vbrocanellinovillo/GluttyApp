import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function BackButton({ navigation }) {
  function goBack() {
    navigation.goBack();
  }

  return (
    <TouchableOpacity onPress={goBack}>
      <View style={styles.container}>
        <Ionicons name="chevron-back" size={28} color={Colors.oceanBlue} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "18%",
  },
});
