import { StyleSheet, View } from "react-native";
import SectionMenuTitle from "./SectionMenuTItle";
import DocumentPickerControl from "../UI/Controls/DocumentPickerControl";

export default function AddMenues({ onSave }) {
  function pickDocument(document) {
    const documents = [document];
    onSave && onSave(documents);
  }

  return (
    <View style={styles.container}>
      <SectionMenuTitle>Selecciona tus menús!</SectionMenuTitle>
      <DocumentPickerControl
        onPickDocument={pickDocument}
        label="Carga el .pdf de tu menú"
        containerStyle={styles.pickerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
