import { StyleSheet, View } from "react-native";
import MenuesList from "./MenuesList";
import SectionMenuTitle from "./SectionMenuTItle";

export default function MyMenues({ menues, onDelete, onVisualize }) {
  return (
    <View style={styles.container}>
      <SectionMenuTitle>Mis menús cargados</SectionMenuTitle>
      <MenuesList
        menues={menues}
        onDelete={onDelete}
        onVisualize={onVisualize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 20,
  },
});
