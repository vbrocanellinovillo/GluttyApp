import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import { Colors } from "../../../constants/colors";

export default function PdfItem({ name, size, onVisualize, onDelete }) {
  return (
    <View style={styles.previewContainer}>
      <View style={styles.row}>
        <Feather
          style={styles.fileIcon}
          name="file"
          size={24}
          color={Colors.mJordan}
        />
        <View style={styles.textContainer}>
          <TextCommonsRegular style={styles.documentName}>
            {name}
          </TextCommonsRegular>
          <TextCommonsRegular style={styles.documentSize}>
            {(size / 1024).toFixed(2)} MB
          </TextCommonsRegular>
        </View>
        <TouchableOpacity style={styles.iconWrapper} onPress={onVisualize}>
          <Entypo name="eye" size={24} color={Colors.mJordan} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper} onPress={onDelete}>
          <Entypo name="squared-cross" size={24} color={Colors.mJordan} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  fileIcon: {
    marginRight: 10,
  },

  textContainer: {
    flex: 1,
  },

  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.mJordan,
  },

  documentSize: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },

  iconWrapper: {
    marginLeft: 15,
  },
});
