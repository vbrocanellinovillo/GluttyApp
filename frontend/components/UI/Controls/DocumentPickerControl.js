import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Button from "./Button";
import { Colors } from "../../../constants/colors";
import GluttyModal from "../GluttyModal";
import PdfItem from "../Pdf/PdfItem";

export default function DocumentPickerControl({
  multiple,
  onPickDocument,
  onRemoveDocument,
  buttonStyle,
  buttonTextStyle,
  label,
  clear,
}) {
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(undefined);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const closeModalHandler = () => {
    setIsError(false);
    setMessage("");
  };

  useEffect(() => {
    setSelectedDocuments([]);
    setSelectedDocument();
  }, [clear]);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const fileSizeMB = file.size / (1024 * 1024);

        if (fileSizeMB > 10) {
          setMessage("Error, el archivo supera los 10 MB de tamaño");
          setIsError(true);
        } else {
          if (multiple) {
            setSelectedDocuments([...selectedDocuments, file]);
          } else {
            setSelectedDocument(file);
          }

          if (onPickDocument) onPickDocument(file);
        }
      }
    } catch (error) {
      setMessage(
        "Ocurrio un error al seleccionar el documento. Por favor intente de nuevo más tarde"
      );
      setIsError(true);
    }
  };

  const removeDocument = async (document) => {
    if (multiple) {
      setSelectedDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.uri !== document.uri)
      );
    } else {
      setSelectedDocument(undefined);
    }

    if (onRemoveDocument) onRemoveDocument(document);
  };

  return (
    <>
      <>
        <Button
          style={[styles.button, buttonStyle]}
          textStyle={buttonTextStyle}
          onPress={pickDocument}
        >
          {label}
        </Button>
        {multiple
          ? selectedDocuments.length > 0 && (
              <View>
                <FlatList
                  data={selectedDocuments}
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
            )
          : selectedDocument && (
              <PdfItem
                document={selectedDocument}
                onDelete={() => removeDocument(item)}
              />
            )}
      </>
      <GluttyModal
        visible={isError}
        isError={true}
        message={message}
        onClose={closeModalHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  button: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: Colors.locro,
  },
});
