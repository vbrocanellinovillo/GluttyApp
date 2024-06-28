import { Image, StyleSheet, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import Button from "./Controls/Button";

export default function GluttyModal({ visible, isError, message, onClose }) {
  const imageUri = isError
    ? "https://res.cloudinary.com/dksmkvi49/image/upload/v1719530424/triste_edit-removebg-preview_uurefr.png"
    : "https://res.cloudinary.com/dksmkvi49/image/upload/v1719530401/haciendo_dedo-removebg-preview_fb6wxt.png";

  const icon = isError
    ? { name: "close-circle", color: Colors.redError }
    : { name: "checkmark-circle", color: "green" };

  return (
    <Portal>
      <Dialog style={styles.dialog} onDismiss={onClose} visible={visible}>
        <Dialog.Content>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
          <View style={styles.contentContainer}>
            <Ionicons name={icon.name} color={icon.color} size={30} />
            <Text style={styles.message}>{message}</Text>
          </View>
          <Button backgroundColor={"#aaa"} onPress={onClose}>
            Cerrar
          </Button>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#ccc",
    borderRadius: 14,
    marginBottom: 40,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },

  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
    marginVertical: 16,
  },

  message: {
    color: Colors.mJordan,
    fontSize: 21,
    flexShrink: 1
  },
});
