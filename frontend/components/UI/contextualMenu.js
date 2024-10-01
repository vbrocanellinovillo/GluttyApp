import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function ContextualMenu({ onEdit, onDelete }) {
  return (
    <View style={styles.menuContainer}>
      {/* Botón para eliminar */}
      <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color={Colors.darkGray}
          style={styles.iconStyle}
        />
        <Text style={styles.menuText}>Eliminar Estudio</Text>
      </TouchableOpacity>

      {/* Botón para editar */}
      <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
        <MaterialCommunityIcons
          name="pencil-outline"
          size={24}
          color={Colors.darkGray}
          style={styles.iconStyle}
        />
        <Text style={styles.menuText}>Editar Estudio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 7,
    padding: 7,
    shadowColor: "rgba(0,0,0,0.2)",  // Sombras en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 25,  // Mayor elevación en Android
    position: "absolute",
    top: 28,  // Ajusta según la distancia que quieras respecto al icono de tres puntos
    right: 0, // Alineado con el icono
    zIndex: 10000,  // Aumenta el zIndex para garantizar que esté al frente
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
});
