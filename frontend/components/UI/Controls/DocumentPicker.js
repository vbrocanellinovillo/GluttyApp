import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from './Button';
import { Colors } from '../../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { sendPdf } from '../../../services/commerceService';
import { useSelector } from 'react-redux';

export default function DocumentPickerComponent() {
  const token = useSelector((state) => state.auth.accessToken);
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      if (!result.canceled) {
        const file = result.assets[0]; // Accedemos al primer elemento de assets
        const fileSizeMB = file.size / (1024 * 1024); // Convertimos tamaño a MB
        if (fileSizeMB > 10) {
          Alert.alert('Archivo demasiado grande', 'El archivo supera los 10 MB de tamaño.');
        } else {
          setSelectedDocuments([...selectedDocuments, file]);
        }
      } else {
        Alert.alert('No se seleccionó ningún documento');
      }
    } catch (error) {
      console.error('Error al seleccionar el documento:', error);
    }
  };

  const removeDocument = (uri) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={pickDocument}>Carga el .pdf de tu menú</Button>
      {selectedDocuments.length > 0 && selectedDocuments.map((document, index) => (
        <View key={index} style={styles.previewContainer}>
          <View style={styles.row}>
            <Feather style={styles.fileIcon} name="file" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.documentName}>{document.name}</Text>
              <Text style={styles.documentSize}>{(document.size / (1024 * 1024)).toFixed(2)} MB</Text>
            </View>
            <TouchableOpacity onPress={() => removeDocument(document.uri)}>
              <Entypo name="squared-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Button onPress={() => sendPdf(selectedDocuments, token)}>Guardar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    backgroundColor: Colors.locro,
  },
  previewContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  documentSize: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  removeIcon: {
    marginLeft: 10,
  },
});
