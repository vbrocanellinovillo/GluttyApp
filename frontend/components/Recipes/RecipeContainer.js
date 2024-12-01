import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalada

export default function RecipeContainer({ title, message, created_at, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        setExpanded(!expanded);
    }

    return (
        <TouchableOpacity onPress={toggleExpand} style={styles.container}>
            <Text style={styles.recipeTitle}>{title}</Text>
            {expanded ? (
                <Text style={styles.recipeContent}>{message}</Text>
            ) : (
                <Text style={styles.recipeContent} numberOfLines={2}>
                    {message}
                </Text>
            )}
            {expanded && (
                <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
                    <Ionicons name="trash-outline" size={22} color="#ff3333" />
                </TouchableOpacity>

            )}
        </TouchableOpacity>
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
    deleteIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        paddingBottom: 10,
    },
});
