import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Searchbar({ backgroundColor, onTextChange }) {
  function handleChange(text) {
    onTextChange(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchbar, { backgroundColor }]}
        onChangeText={handleChange}
      />
      <Ionicons name="search" color="#666" size={24} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  searchbar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    fontSize: 28,
    height: 60,
  },

  icon: {
    position: "absolute",
    right: "5%",
    bottom: "30%",
  },
});
