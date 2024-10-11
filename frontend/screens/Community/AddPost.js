import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Animated, TouchableWithoutFeedback, ScrollView, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextCommonsMedium from '../../components/UI/FontsTexts/TextCommonsMedium';
import { Colors } from '../../constants/colors';
import BottomSheet from "@devvie/bottom-sheet";
import ImageSheetOptions from "../../components/UI/UserImage/ImageSheetOptions";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from "expo-image-picker";

export default function AddPost() {
  const [post, setPost] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedImages, setSelectedImages] = useState([]); 

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(0)).current;

  const sheetRef = useRef();
  const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
  const [galleryPermissions, requestGalleryPermissions] = useMediaLibraryPermissions();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      Animated.parallel([
        Animated.timing(keyboardHeight, {
          toValue: 250,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(inputTranslateY, {
          toValue: -250,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.parallel([
        Animated.timing(keyboardHeight, {
          toValue: 0, 
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(inputTranslateY, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleTagInput = (text) => {
    if (text.includes(' ')) { 
      if (currentTag.trim()) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    } else {
      setCurrentTag(text);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Función para abrir la hoja con las opciones de imagen
  function openImageOptions() {
    sheetRef.current?.open();
  }

  // Función para comprobar permisos y seleccionar imágenes
  async function selectImage(option) {
    sheetRef.current?.close();
    const permissionStatus = await checkPermissions(option);

    if (!permissionStatus) return;

    let imageResult;
    const options = {
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
    };

    if (option === "Take Image") {
      imageResult = await launchCameraAsync(options);
    } else {
      imageResult = await launchImageLibraryAsync(options);
    }

    if (!imageResult.canceled) {
      setSelectedImages([...selectedImages, imageResult.assets[0].uri]);
    }
  }

  // Verifica permisos de cámara o galería
  async function checkPermissions(option) {
    if (option === "Take Image") {
      if (cameraPermissions.status === PermissionStatus.GRANTED) {
        return true;
      }
      const response = await requestCameraPermissions();
      return response.granted;
    } else {
      if (galleryPermissions.status === PermissionStatus.GRANTED) {
        return true;
      }
      const response = await requestGalleryPermissions();
      return response.granted;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Input de posteo */}
        <TextInput
          style={styles.inputPost}
          placeholder="¿Qué recomendación nueva tienes?"
          placeholderTextColor="#999"
          value={post}
          onChangeText={setPost}
          multiline={true}
        />

        {/* Mostrar las imágenes seleccionadas */}
        <ScrollView horizontal style={styles.imagesContainer}>
          {selectedImages.map((imageUri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => removeImage(index)}
              >
                <Ionicons name="trash" size={20} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Animated.View style={{ transform: [{ translateY: inputTranslateY }] }}>
          <TextCommonsMedium style={styles.etiquetasLabel}>Etiquetas de búsqueda</TextCommonsMedium>

          <TextInput
            style={styles.inputEtiqueta}
            placeholder="#Córdoba  #GeneralPaz  #Vegano "
            placeholderTextColor="#999"
            value={currentTag}
            onChangeText={handleTagInput}
            multiline={true}
            maxLength={130}
          />

          <ScrollView style={styles.tagsContainer} horizontal>
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Ionicons name="close-circle" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View style={[styles.buttonsContainer, { bottom: keyboardHeight }]}>
          <TouchableOpacity style={styles.photoButton} onPress={openImageOptions}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <BottomSheet ref={sheetRef} height={200}>
          <ImageSheetOptions
            onTakeImage={selectImage.bind(this, "Take Image")}
            onPickImage={selectImage.bind(this, "Pick Image")}
          />
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%',
  },
  inputPost: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 20,
    flexWrap: 'wrap',
    borderWidth: 1,
    height: 100,
  },
  inputEtiqueta: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: 270,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    maxWidth: 280,
    marginBottom: 110,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: Colors.oceanBlue,
    padding: 8,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12,
  },
  buttonsContainer: {
    position: 'absolute',
    right: 20,
  },
  photoButton: {
    backgroundColor: Colors.locro,
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: Colors.locro,
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 130,
  },
  etiquetasLabel: {
    marginBottom: 10,
    color: Colors.locro,
    fontWeight: 'bold',
    fontSize: 18,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  removeIcon: {
    position: 'absolute',
    top: 5,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
});
