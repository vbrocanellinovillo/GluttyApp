import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener @expo/vector-icons instalada

export default function RecipeContainer({ title, content, onDelete }) {
    const [expanded, setExpanded] = useState(false);

    function toggleExpand() {
        setExpanded(!expanded);
    }

    return (
        <TouchableOpacity onPress={toggleExpand} style={styles.container}>
            <Text style={styles.recipeTitle}>{title}</Text>
            {expanded ? (
                <Text style={styles.recipeContent}>{content}</Text>
            ) : (
                <Text style={styles.recipeContent} numberOfLines={2}>
                    {content}
                </Text>
            )}
            {expanded && (
                <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
                    <Ionicons name="trash-outline" size={20} color="#ff3333" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
    },
    deleteIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});
