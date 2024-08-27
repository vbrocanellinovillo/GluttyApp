import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Searchbar({
  backgroundColor,
  onTextChange,
  placeholder,
  value,
  containerStyle,
  textInputStyle,
  iconStyle,
}) {
  function handleChange(text) {
    onTextChange(text);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.searchbar, { backgroundColor }, textInputStyle]}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
      />
      <Ionicons
        name="search"
        color="#666"
        size={24}
        style={[styles.icon, iconStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  searchbar: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    fontSize: 20,
    height: 60,
  },

  icon: {
    position: "absolute",
    right: "5%",
    bottom: "30%",
  },
});
