import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Colors } from "../../../constants/colors";
import GluttyModal from "../GluttyModal";
import PdfItem from "../Pdf/PdfItem";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";

export default function DocumentPickerControl({
  onPickDocument,
  containerStyle,
  textStyle,
  label,
}) {
  const [selectedDocument, setSelectedDocument] = useState(undefined);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const closeModalHandler = () => {
    setIsError(false);
    setMessage("");
  };

  const pickDocument = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
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
          setSelectedDocument(file);
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

  return (
    <>
      <>
        <Pressable
          onPress={pickDocument}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.container, containerStyle]}>
            <Feather name="upload" size={28} color={Colors.mJordan} />
            {label && (
              <TextCommonsMedium style={[styles.label, textStyle]}>
                {label}
              </TextCommonsMedium>
            )}
          </View>
        </Pressable>
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
    padding: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 10,
    gap: 10,
  },

  pressed: {
    opacity: 0.4,
  },

  label: {
    fontSize: 20,
    color: Colors.mJordan,
  },
});
