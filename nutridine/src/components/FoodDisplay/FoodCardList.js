import React from 'react';
import { Box, VStack, Image, Text } from "@chakra-ui/react";
import useMealsByMacros from "../../hooks/useMealsByMacros";
import FoodCard from "./FoodCard";

export default function FoodCardList({ meals }) {
    return (
        <VStack gap={6}>
            {
                meals.length === 0 ?
                    <Text>No meals found</Text>
                    :
                    meals.map((meal) => (
                        <FoodCard key={meal.id} foodItem={meal} />
                    ))
            }
        </VStack >
    );
}
