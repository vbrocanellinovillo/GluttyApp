import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Portal } from 'react-native-paper';

export default function InfoMedicalVariableContainer({ title, visible, onDismiss, infoText, position }) {
  if (!visible) return null;

  return (
    <Portal>
      <View style={[styles.container, { top: position.y, left: position.x - 110}]}>
        {/* Flecha o triángulo */}
        <View style={styles.triangle} />

        {/* Contenedor del Pop-Up */}
        <View style={styles.popUp}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onDismiss}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999, // Asegúrate de que esté al frente
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'grey',
    marginBottom: -1,
  },
  popUp: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    width: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText: {
    color: 'white',
    fontSize: 14,
  },
});
