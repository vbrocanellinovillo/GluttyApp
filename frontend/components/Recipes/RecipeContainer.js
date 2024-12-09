import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function RecipeContainer({ title, message, created_at, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        setExpanded(!expanded);
    }

    async function handleDownload() {
        try {
            // Define the file name and path
            const fileName = `${title.replace(/\s+/g, '_') || 'message'}.txt`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // Write the message content to the file
            await FileSystem.writeAsStringAsync(fileUri, message, { encoding: FileSystem.EncodingType.UTF8 });

            // Share or download the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                Alert.alert('Descarga', `Archivo guardado en ${fileUri}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al descargar el archivo.');
        }
    }

    return (
        <Pressable onPress={toggleExpand} style={styles.container}>
            <Text style={styles.recipeTitle}>{title}</Text>
            {expanded ? (
                <Text style={styles.recipeContent}>{message}</Text>
            ) : (
                <Text style={styles.recipeContent} numberOfLines={2}>
                    {message}
                </Text>
            )}
            {expanded && (
                <View style={styles.iconContainer}>
                    {/* <Pressable onPress={handleDownload} style={styles.downloadIcon}>
                        <Ionicons name="download-outline" size={24} color="#5555ff" />
                    </Pressable> */}
                    <Pressable onPress={onDelete} style={styles.deleteIcon}>
                        <Ionicons name="trash-outline" size={24} color="#ff3333" />
                    </Pressable>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d9d9d9',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        position: 'relative',
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    recipeContent: {
        fontSize: 14,
        color: '#555',
        paddingBottom: 15,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 10,
    },
    downloadIcon: {
        marginRight: 15,
    },
    
});
