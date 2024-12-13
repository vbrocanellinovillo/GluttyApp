import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { Colors } from "../../constants/colors";

export default function ReasonBlock({
  visible,
  onClose,
  onConfirm,
  isLoading,
}) {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    onConfirm(reason);
  };

  return (
    <Portal>
      <Dialog style={styles.dialog} onDismiss={onClose} visible={visible}>
          <Text style={styles.title}>
            Ingrese el motivo del bloqueo del usuario
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Escriba el motivo aquí..."
            value={reason}
            onChangeText={setReason}
          />
          <View style={styles.buttonsContainer}>
            {/* Botón Cancelar */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.locro }]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, { color: Colors.white }]}>Cancelar</Text>
            </TouchableOpacity>
            {/* Botón Aceptar */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: Colors.locro }]}
              onPress={handleConfirm}
              disabled={isLoading}
            >
              <Text style={[styles.buttonText, { color: Colors.white }]}>
                {isLoading ? "Cargando..." : "Aceptar"}
              </Text>
            </TouchableOpacity>
          </View>

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
    padding: 20
  },
  title: {
    fontSize: 18,
    color: Colors.mJordan,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    //backgroundColor: "grey",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: Colors.locro,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
