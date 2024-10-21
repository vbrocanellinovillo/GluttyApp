// AddComment.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalado
import LoadingGlutty from '../UI/Loading/LoadingGlutty';
import GluttyModal from '../UI/GluttyModal';
import { Colors } from '../../constants/colors';
import addComment from '../../services/communityService';
import { useSelector } from 'react-redux';
import Comment from './Comment';
import UserImage from '../UI/UserImage/UserImage';

export default function AddComment({id_post}) {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [commentAddedModal, setCommentAddedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalError, showModalError] = useState(false);
  const [comentarioAgregado, setComentarioAgregado] = useState(null); // Estado para almacenar el comentario agregado


  const token = useSelector((state) => state.auth.accessToken);

  const handleSend = async () => {
    try {
        Keyboard.dismiss();
        console.log("Iniciando subida del comentario");
        setIsLoading(true);
        
        const nuevoComentario = await addComment(id_post, comment, token); // SE AGREGA EL COMENTARIO

        setComentarioAgregado(nuevoComentario); // Actualizar el estado con el nuevo comentario
        setIsLoading(false);
        setCommentAddedModal(true);
        setComment('');
        
      } catch (error) {
        console.log(comment);
        console.error("Error al subir el post:", error);
        setIsLoading(false);
        setIsError(true)
        showModalError(true)
        setErrorMessage(error.message);
        setIsLoading(false);
         
      }
  };
  
  
  return (
    <>{/* Renderizar el comentario solo si existe */}
    {comentarioAgregado && (
      <View>
        <Comment comment={comentarioAgregado} />
      </View>
    )}
    
    <View style={styles.container}>

      <LoadingGlutty
          visible={isLoading}>
      </LoadingGlutty>
      
      <GluttyModal
        visible={modalError}
        isError={isError}
        message={errorMessage}
        onClose={() => showModalError(false)}>
      </GluttyModal>

      <GluttyModal
      visible={commentAddedModal}
      message={"Comentario publicado!"}
      other
      buttons={[
          {
            text: "Aceptar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress:  () => setCommentAddedModal(false),
          },
        ]}
        closeButtonText="Cancelar">
      </GluttyModal>

      <UserImage dimensions={40} />

      <TextInput
        style={styles.input}
        placeholder="Nuevo comentario..."
        placeholderTextColor="#8B857E"
        value={comment}
        onChangeText={setComment}
        multiline={true}  // Permite múltiples líneas
        textAlignVertical="top"  // Alinea el texto al inicio verticalmente
      />

      <TouchableOpacity style={styles.emojiButton}>
        <Ionicons name="happy-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Ionicons name="arrow-forward" size={22} color="black" />
      </TouchableOpacity>
    </View></>
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
    borderRadius: 20,  // Cambiado para mantener la proporción del círculo
    overflow: 'hidden',  // Asegura que el borde recorte la imagen
    backgroundColor: '#555',  // Agrega un fondo para pruebas
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
    paddingVertical: 8,
    maxHeight: 120, 
    borderColor: '#ccc',  // Opcional: Borde para hacer más visible el campo
  },
  sendButton: {
    backgroundColor: Colors.locro,
    borderRadius: 30,
    padding: 8,
    marginHorizontal: 5,
  },
  emojiButton: {
    padding: 8,
  },
});
