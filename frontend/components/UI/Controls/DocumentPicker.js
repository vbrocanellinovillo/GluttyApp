import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Button from './Button';
import { Colors } from '../../../constants/colors';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { sendPdf, getAllMenues, deletePdf, getPdfById } from '../../../services/commerceService';
import { useSelector } from 'react-redux';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import GluttyModal from '../GluttyModal';
import LoadingGlutty from '../Loading/LoadingGlutty';


export default function DocumentPickerComponent() {
  const token = useSelector((state) => state.auth.accessToken);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [uploadedMenues, setUploadedMenues] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, serError] = useState("");

  function closeModalHandler() {
    setIsError(false);
    serError("");
  }

  // Cargar menús al montar el componente
  useEffect(() => {
    const fetchMenues = async () => {
      try {
        const response = await getAllMenues(token);
        console.log("HOLA:",response);
        setUploadedMenues(response.menues);
      } catch (error) {
        Alert.alert('Error al cargar los menús', error.message);
      }
    };

    fetchMenues();
  }, [token]);

  const enviarPdf = async (selectedDocuments, token) => {
    try {
      setisloading(true);
      await sendPdf(selectedDocuments, token);
      // Después de enviar los documentos, vacía el array de documentos seleccionados
      setSelectedDocuments([]);
    
      const response = await getAllMenues(token);
      if (response) {
        setUploadedMenues(response.menues);
        setisloading(false);
        closeModalHandler();
      }
      
      console.log("array enviado:",response);

    } catch (error) {
      Alert.alert('Error al enviar los documentos', error.message);
    } finally {
      //setisloading(false);

    }
  };
  
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      if (!result.canceled) {
        const file = result.assets[0];
        const fileSizeMB = file.size / (1024 * 1024);
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

  const removeDocument = async (uri, id) => {
    setSelectedDocuments(prevDocuments => prevDocuments.filter(doc => doc.uri !== uri));

    setUploadedMenues(prevMenues => {
      const updatedMenues = prevMenues.filter(doc => doc.id !== id);
      return updatedMenues;
    });

    if (id !== undefined) {
      
      await deletePdf(token, id);      
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const OpenPdfButton = async (id) => {
    try {
      // Obtener el blob del PDF desde el backend
      const response = await getPdfById(id, token);
  
      if (!response.ok) {
        throw new Error('Error al obtener el PDF del backend');
      }
  
      // Convertir el blob a un archivo local
      const fileUri = FileSystem.documentDirectory + 'temp.pdf';
      
      // Leer el blob como un array buffer
      const arrayBuffer = await response.arrayBuffer();
      
      // Convertir array buffer a base64
      const base64Data = arrayBufferToBase64(arrayBuffer);
  
      // Guardar el archivo PDF en el sistema de archivos
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Verificar si el dispositivo puede compartir archivos
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Sharing no está disponible', 'No se puede compartir archivos en este dispositivo.');
      }
    } catch (error) {
      console.error('Error al abrir el PDF:', error);
    }
  };

  const openLocalPdf = async (document) => {
    try {
      // Verifica si el archivo PDF existe en la URI proporcionada
      const fileInfo = await FileSystem.getInfoAsync(document.uri);
      
      // Abre el archivo PDF utilizando expo-sharing
      await Sharing.shareAsync(fileInfo.uri);
    } catch (error) {
      console.error('Error al intentar compartir el PDF:', error.message);
    }
  };
  
  
  return (
    <ScrollView style={styles.container}>
        <Button style={styles.button} onPress={pickDocument}>Carga el .pdf de tu menú</Button>

        {/*Mostrar menús previamente subidos*/}
        {uploadedMenues.length > 0 && uploadedMenues.map((menu, index) => (
        <View key={index} style={styles.previewContainer}>
          <View style={styles.row}>
            <Feather style={styles.fileIcon} name="file" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.documentName}>{menu.file_name}</Text>
              <Text style={styles.documentSize}>{(menu.file_size / 1024).toFixed(2)} MB</Text>
            </View>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => OpenPdfButton(menu.id)}>
              <Entypo name="eye" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => removeDocument("", menu.id)}>
              <Entypo name="squared-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
        

      {/* Mostrar documentos seleccionados*/}
      
      {selectedDocuments.length > 0 && selectedDocuments.map((document, index) => (
        <View key={index} style={styles.previewContainer}>
          <View style={styles.row}>
            <Feather style={styles.fileIcon} name="file" size={24} color="black" />
            <View style={styles.textContainer}>
              <Text style={styles.documentName}>{document.name}</Text>
              <Text style={styles.documentSize}>{(document.size / (1024 * 1024)).toFixed(2)} MB</Text>
            </View>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => openLocalPdf(document)}>
              <Entypo name="eye" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconWrapper} onPress={() => removeDocument(document.uri, "")}>
              <Entypo name="squared-cross" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View styles={styles.contenedorBTN}>
        <Button style={styles.botonGuardar} onPress={() => enviarPdf(selectedDocuments, token)}>Guardar</Button>
      </View>
      <LoadingGlutty visible={isloading} color={Colors.vainilla} />
      <GluttyModal
        visible={isError}
        isError={true}
        message={error}
        onClose={closeModalHandler}
      />
    </ScrollView>
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
  iconWrapper: {
    marginLeft: 15,
  },
  botonGuardar: {
    borderRadius: 20, // Ajusta el redondeado
    paddingHorizontal: 20, // Reduce el espacio horizontal
    paddingVertical: 10, // Reduce el espacio vertical
    marginTop: 10, // Ajusta el margen superior
    backgroundColor: Colors.pielcita,
    alignSelf: 'center',
    color: Colors.mJordan,
  },
  contenedorBTN: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

