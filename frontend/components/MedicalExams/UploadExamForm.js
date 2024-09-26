import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import DocumentPickerControl from "../UI/Controls/DocumentPickerControl";
import FormButtonsGroup from "../UI/Controls/FormButtonsGroup";

export default function UploadExamForm({ onCancel, onOmit, onReadPdf }) {
  function handleDocumentPick(pdf) {
    onReadPdf(pdf);
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <TextCommonsMedium style={styles.title}>
          Carga automatica los valores con el .pdf de tu examen
        </TextCommonsMedium>
        <DocumentPickerControl onPickDocument={handleDocumentPick} />
      </View>
      <FormButtonsGroup
        prev="Cancelar"
        next="Omitir"
        onPrev={onCancel}
        onNext={onOmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 100,
    paddingHorizontal: 30,
  },

  section: {
    gap: 16,
  },

  title: {
    fontSize: 28,
    color: Colors.mJordan,
    textAlign: "center",
  },
});
