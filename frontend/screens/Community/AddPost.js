import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard, Animated, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextCommonsMedium from '../../components/UI/FontsTexts/TextCommonsMedium';
import { Colors } from '../../constants/colors';

export default function AddPost() {
  const [post, setPost] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const inputTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      Animated.parallel([
        Animated.timing(keyboardHeight, {
          toValue: 250, //event.endCoordinates.height, 
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(inputTranslateY, {
          toValue: -250,//-event.endCoordinates.height,
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

  // Manejar la entrada de etiquetas
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

  // Función para eliminar una etiqueta por su índice
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

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

        {/* Animación para las etiquetas y el input */}
        <Animated.View style={{ transform: [{ translateY: inputTranslateY }] }}>
          {/* Etiqueta para las etiquetas */}
          <TextCommonsMedium style={styles.etiquetasLabel}>Etiquetas de búsqueda</TextCommonsMedium>

          {/* Input de etiquetas */}
          <TextInput
            style={styles.inputEtiqueta}
            placeholder="#Córdoba  #GeneralPaz  #Vegano "
            placeholderTextColor="#999"
            value={currentTag}
            onChangeText={handleTagInput}
            onSubmitEditing={() => {
              if (currentTag.trim()) {
                setTags([...tags, currentTag.trim()]);
                setCurrentTag('');
              }
            }}
            multiline={true}
            maxLength={130}
          />

          {/* Mostrar etiquetas */}
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

        {/* Botones animados (cámara y enviar) */}
        <Animated.View style={[styles.buttonsContainer, { bottom: keyboardHeight }]}>
          {/* Botón de la cámara */}
          <TouchableOpacity style={styles.photoButton}>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>

          {/* Botón de enviar */}
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
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
    //height: 150,
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
    marginTop: 280,
    marginBottom: 10,
    color: Colors.locro,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
