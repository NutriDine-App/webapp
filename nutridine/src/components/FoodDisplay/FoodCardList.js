import React from "react";
import { VStack, Text, Center } from "@chakra-ui/react";
import FoodCard from "./FoodCard";

export default function FoodCardList({ meals }) {
  if (!meals || meals.length === 0)
    return (
      <Center w="100%" h="4rem">
        <Text>No meals found</Text>
      </Center>
    );

  return (
    <VStack gap={6}>
      {meals.map((meal) => (
        <FoodCard key={meal.nix_item_id} foodItem={meal} />
      ))}
    </VStack>
  );
}
