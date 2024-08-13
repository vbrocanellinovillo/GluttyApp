import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from './Button';

export default function DocumentPickerComponent() {
  
    const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true });
      console.log(result);
      if (!result.canceled) {
        Alert.alert('Documento seleccionado', result.uri);
        
      } else {
        Alert.alert('No se seleccionó ningún documento');
      }
    } catch (error) {
      console.error('Error al seleccionar el documento:', error);
    }
  }

  return (
    <Button style={styles.container} onPress={pickDocument}>hola</Button>
  );
};

const styles = StyleSheet.create({
    container: {
    },
     
})

;



