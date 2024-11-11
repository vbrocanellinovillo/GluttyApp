import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import RecipeContainer from '../../../components/Recipes/RecipeContainer';

export default function MyRecipes() {
    const [savedRecipes, setSavedRecipes] = useState([
        {
            title: 'Ensalada Mediterránea',
            content: `Ingredientes:\n- 2 tazas de espinacas frescas\n- 1 taza de tomates cherry, cortados a la mitad\n- ...`
        },
        {
            title: 'Pollo al Curry con Coco',
            content: `Ingredientes:\n- 500 g de pechuga de pollo, en cubos\n- 1 lata de leche de coco (400 ml)\n- ...`
        },
        {
            title: 'Brownies de Chocolate',
            content: `Ingredientes:\n- 200 g de chocolate negro\n- 150 g de mantequilla\n- 3/4 taza de azúcar\n- ...`
        },
    ]);

    function handleDelete(index) {
        const updatedRecipes = savedRecipes.filter((_, i) => i !== index);
        setSavedRecipes(updatedRecipes);
    }

    return (
        <ScrollView style={styles.container}>
            {savedRecipes.map((recipe, index) => (
                <RecipeContainer
                    key={index}
                    title={recipe.title}
                    content={recipe.content}
                    onDelete={() => handleDelete(index)}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6600',
        textAlign: 'center',
        marginBottom: 20,
    },
});
