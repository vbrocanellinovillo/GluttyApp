// AddComment.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado

export default function AddComment() {
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      addComment(comment);
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://placekitten.com/40/40' }} // Puedes reemplazar con la imagen que necesites
        style={styles.profileImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevo comentario..."
        placeholderTextColor="#8B857E"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.emojiButton}>
        <Ionicons name="happy-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="arrow-forward" size={22} color="black" />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECEBEA',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'black',
    marginLeft: -40,
  },
  sendButton: {
    backgroundColor: '#f4a261',
    borderRadius: 30,
    padding: 8,
    marginHorizontal: 5,
  },
  emojiButton: {
    padding: 8,
  },
});
