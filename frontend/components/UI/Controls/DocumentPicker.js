/*import React, { useState } from 'react';
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
    <Button style={styles.container} onPress={pickDocument}>Carga el .pdf de tu menu</Button>
    

  );
};

const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 14,
      position: "relative",
      flexDirection: "row",
      justifyContent: "space-around",
    },
     
})

;*/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from './Button';
import { Colors } from '../../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

export default function DocumentPickerComponent() {
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: true });
      console.log(result);
      if (result.type !== 'cancel') {
        const fileSizeMB = result.assets[0].size / (1024 * 1024); // Convertir tamaño a MB
        if (fileSizeMB > 50) {
          Alert.alert('Archivo demasiado grande', 'El archivo supera los 50 MB de tamaño.');
        } else {
          setSelectedDocuments([...selectedDocuments, result]);
          console.log(result.assets[0].uri)
        }
      } else {
        Alert.alert('No se seleccionó ningún documento');
      }
    } catch (error) {
      console.error('Error al seleccionar el documento:', error);
    }
  };

  const removeDocument = (uri) => {
    setSelectedDocuments(selectedDocuments.filter(doc => doc.assets[0].uri !== uri));
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} onPress={pickDocument}>Carga el .pdf de tu menú</Button>
      {selectedDocuments.length > 0 && selectedDocuments.map((document, index) => (
        <View key={index} style={styles.previewContainer}>
          <View style={styles.row}>
            <Feather style={styles.fileIcon} name="file" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.documentName}>{document.assets[0].name}</Text>
              <Text style={styles.documentSize}>{(document.assets[0].size / (1024 * 1024)).toFixed(2)} MB</Text>
            </View>
            <TouchableOpacity onPress={() => removeDocument(document.assets[0].uri)}>
              <Entypo name="squared-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

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
