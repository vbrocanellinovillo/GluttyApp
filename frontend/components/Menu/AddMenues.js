import { StyleSheet, View } from "react-native";
import SectionMenuTitle from "./SectionMenuTItle";
import DocumentPickerControl from "../UI/Controls/DocumentPickerControl";
import { useState } from "react";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";

export default function AddMenues({ onSave }) {
  const [pickedDocuments, setPickedDocuments] = useState([]);
  const [clear, setClear] = useState(false);

  function pickDocument(document) {
    setPickedDocuments([...pickedDocuments, document]);
  }

  function removeDocument(document) {
    setPickedDocuments((prevDocuments) =>
      prevDocuments.filter((doc) => doc.uri !== document.uri)
    );
  }

  function handleSave() {
    onSave(pickedDocuments);
    setPickedDocuments([]);
    setClear(!clear); // Lo uso para hacerle saber al document picker que limpie su lista de docs
  }

  return (
    <View style={styles.container}>
      <SectionMenuTitle>Pre-seleccionar menús</SectionMenuTitle>
      <DocumentPickerControl
        multiple
        onPickDocument={pickDocument}
        onRemoveDocument={removeDocument}
        label="Carga el .pdf de tu menú"
        clear={clear}
      />
      <View style={styles.contenedorBTN}>
        <Button style={styles.botonGuardar} onPress={handleSave}>
          Guardar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  botonGuardar: {
    borderRadius: 20, // Ajusta el redondeado
    paddingHorizontal: 20, // Reduce el espacio horizontal
    paddingVertical: 10, // Reduce el espacio vertical
    marginTop: 10, // Ajusta el margen superior
    backgroundColor: Colors.pielcita,
    alignSelf: "center",
    color: Colors.mJordan,
  },
  contenedorBTN: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
