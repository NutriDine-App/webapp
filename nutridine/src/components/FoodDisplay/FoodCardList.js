import React from 'react';
import { Box, VStack, Image, Text } from "@chakra-ui/react";
import useMealsByMacros from "../../hooks/useMealsByMacros";
import FoodCard from "./FoodCard";

export default function FoodCardList({ meals }) {

    if (!meals || meals.length === 0)
        return <Text>No meals found</Text>

    return (
        <VStack gap={6}>
            {
                meals.map((meal) => (
                    <FoodCard key={meal.id} foodItem={meal} />
                ))
            }
        </VStack >
    );
}
