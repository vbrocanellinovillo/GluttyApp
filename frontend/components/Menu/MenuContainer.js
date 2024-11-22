import { StyleSheet, View } from "react-native";
import MyMenues from "./MyMenues";
import AddMenues from "./AddMenues";
import { Divider } from "react-native-paper";

export default function MenuContainer({
  menues,
  onSave,
  onDelete,
  onVisualize,
}) {
  return (
    <View style={styles.menu}>
      <MyMenues menues={menues} onDelete={onDelete} onVisualize={onVisualize} />
      <Divider />
      <AddMenues onSave={onSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 240,
  },
});
