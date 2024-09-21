import { StyleSheet, View, FlatList } from "react-native";
import PdfItem from "../UI/Pdf/PdfItem";
import SectionMenuTitle from "./SectionMenuTItle";
import DocumentPickerControl from "../UI/Controls/DocumentPickerControl";
import { useState } from "react";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";

export default function AddMenues({ onSave }) {
  const [pickedDocuments, setPickedDocuments] = useState([]);

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
  }

  return (
    <View style={styles.container}>
      <SectionMenuTitle>Pre-seleccionar menús</SectionMenuTitle>
      {pickedDocuments && pickedDocuments.length > 0 && (
        <View style={styles.documents}>
          <FlatList
            data={pickedDocuments}
            renderItem={({ item }) => (
              <PdfItem
                name={item.name}
                size={(item.size / Math.pow(1024, 2)).toFixed(2)}
                onDelete={() => removeDocument(item)}
              />
            )}
            keyExtractor={(item) => item.uri}
          />
        </View>
      )}
      <DocumentPickerControl
        onPickDocument={pickDocument}
        label="Carga el .pdf de tu menú"
        containerStyle={styles.pickerStyle}
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

  documents: {
    maxHeight: "60%"
  },

  pickerStyle: {
    maxHeight: 110
  },
});
