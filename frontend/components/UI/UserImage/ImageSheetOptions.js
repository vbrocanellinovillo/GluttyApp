import { View, StyleSheet } from "react-native";
import Button from "../Controls/Button";
import { useEffect } from "react";

export default function ImageSheetOptions({ onTakeImage, onPickImage }) {
  return (
    <View style={styles.container}>
      <Button
        leftIcon="camera"
        iconSize={24}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onTakeImage}
        opacityPress
      >
        Tomar foto
      </Button>
      <Button
        leftIcon="image"
        iconSize={24}
        style={styles.button}
        textStyle={styles.buttonText}
        onPress={onPickImage}
        opacityPress
      >
        Seleccionar de galeria
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 5,
  },

  button: {
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
  },

  buttonText: {
    fontWeight: 400,
  },
});
