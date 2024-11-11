import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RecipeContainer from '../../../components/Recipes/RecipeContainer';
import { consultarMensajes, saveMessage } from '../../../services/chatbotService';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import GluttyModal from '../../../components/UI/GluttyModal';
import { Colors } from '../../../constants/colors';
import LoadingGlutty from '../../../components/UI/Loading/LoadingGlutty';

export default function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    const token = useSelector((state) => state.auth.accessToken);

    useFocusEffect(
        useCallback(() => {
            const cargarMensajesGuardados = async () => {
                setIsLoading(true);
                try {
                    const mensajesGuardados = await consultarMensajes(token);
                    setSavedRecipes(mensajesGuardados);
                } catch (error) {
                    setIsError(true);
                    setMessage("Error al cargar mensajes.");
                    setShowModal(true);
                } finally {
                    setIsLoading(false);
                }
            };
            cargarMensajesGuardados();
        }, [token])
    );

    async function confirmModalDeleteHandler() {
        try {
            setIsLoading(true);
            await saveMessage(deleteIndex, "", token); // Enviar contenido vacío para eliminar

            // Filtrar la receta eliminada
            const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== deleteIndex);
            setSavedRecipes(updatedRecipes);

            setMessage("El mensaje fue eliminado con éxito");
            setShowModal(true);
        } catch (error) {
            setIsError(true);
            setMessage(error.message || "Error al eliminar el mensaje.");
            setShowModal(true);
        } finally {
            setIsLoading(false);
            setShowEliminarModal(false);
            setDeleteIndex(null);
        }
    }

    function closeModalHandler() {
        setShowModal(false);
    }

    function closeModalDeleteHandler() {
        setShowEliminarModal(false);
    }

    return (
        <>
            <LoadingGlutty visible={isLoading} />
            <GluttyModal
                isError={isError}
                message={message}
                onClose={closeModalHandler}
                visible={showModal}
            />

            <GluttyModal
                visible={showEliminarModal}
                onClose={closeModalDeleteHandler}
                message="¿Está seguro que desea eliminar la receta?"
                other
                buttons={[
                    {
                        text: "Confirmar",
                        bg: "green",
                        color: Colors.whiteGreen,
                        onPress: confirmModalDeleteHandler
                    },
                ]}
                closeButtonText="Cancelar"
            />

            <ScrollView style={styles.container}>
                {savedRecipes && savedRecipes.length > 0 ? (
                    savedRecipes.map((recipe, index) => (
                        <RecipeContainer
                            key={index}
                            title={recipe.title || "Sin título"}
                            message={recipe.message}
                            created_at={recipe.created_at}
                            onDelete={() => {
                                setDeleteIndex(recipe.id);
                                setShowEliminarModal(true);
                            }}
                        />
                    ))
                ) : (
                    <Text style={styles.noRecipesText}>No hay recetas guardadas.</Text>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //backgroundColor: 'white',
        marginBottom: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6600',
        textAlign: 'center',
        marginBottom: 20,
    },
    noRecipesText: {
        textAlign: 'center',
        color: '#555',
        marginTop: 20,
    },
});
