import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import FoodCard from "./FoodCard";

export default function FoodCardList({ meals }) {
  if (!meals || meals.length === 0) return <Text>No meals found</Text>;

  return (
    <VStack gap={6}>
      {meals.map((meal) => (
        <FoodCard key={meal.nix_item_id} foodItem={meal} />
      ))}
    </VStack>
  );
}
