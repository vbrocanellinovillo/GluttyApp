import { Image, StyleSheet, View } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import Button from "./Controls/Button";
import { sadGlutty, smileGlutty, thumbGlutty } from "../../constants/glutty";

export default function GluttyModal({
  visible,
  other,
  isError,
  message,
  onClose,
  buttons, // Array de botones. Boton: {text, bg, color, style, onPress, id}
  closeButton = true,
  closeButtonStyle,
  closeButtonColor,
  closeButtonBg,
}) {
  const imageUri = other ? smileGlutty : isError ? sadGlutty : thumbGlutty;

  const icon = other
    ? { name: undefined, color: undefined }
    : isError
    ? { name: "close-circle", color: Colors.redError }
    : { name: "checkmark-circle", color: "green" };

  return (
    <Portal>
      <Dialog style={styles.dialog} onDismiss={onClose} visible={visible}>
        <Dialog.Content>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
          <View
            style={[
              styles.contentContainer,
              { justifyContent: other && "center" },
            ]}
          >
            <Ionicons name={icon.name} color={icon.color} size={30} />
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {closeButton && (
              <View style={styles.buttonContainer}>
                <Button
                  backgroundColor={closeButtonBg ? closeButtonBg : "#aaa"}
                  color={closeButtonColor}
                  onPress={onClose}
                  style={closeButtonStyle}
                >
                  Cerrar
                </Button>
              </View>
            )}
            {buttons &&
              buttons.map((button) => (
                <View
                  style={styles.buttonContainer}
                  key={button.id ? button.id : Math.random()}
                >
                  <Button
                    backgroundColor={button.bg ? button.bg : "#aaa"}
                    color={button.color}
                    style={button.style}
                    onPress={button.onPress ? button.onPress : () => undefined}
                  >
                    {button.text}
                  </Button>
                </View>
              ))}
          </View>
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
    elevation: 5,
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 120,
    height: 120,
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
    flexShrink: 1,
  },

  buttonsContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },

  buttonContainer: {
    flex: 1,
  },
});
