import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { useState } from "react";
import DetailedFoodModalContent from "../DetailedFoodModalContent";

function FoodCard({ foodItem }) {
  const { colorMode } = useColorMode();
  // **IMPORTANT** rendering only the selectedMeal avoids wasting 19 detailedMeal fetches (max 50 daily API limit).
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // state of the modal

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setIsOpen(true);
  };
  const closeModal = () => {
    setSelectedMeal(null);
    setIsOpen(false);
  };

  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="15"
      overflow="hidden"
      bg={colorMode === "dark" ? "gray.700" : "gray.50"}
      onClick={() => openModal(foodItem)}
      cursor="pointer"
      _hover={{ shadow: "md" }}
      fontFamily={"navbar"}
    >
      <VStack align="start" justify="space-between" p={4} spacing={4} w="full">
        <Box>
          <Text
            fontSize="sm"
            color={colorMode === "dark" ? "gray.300" : "gray.500"}
          >
            {foodItem.brand_name}
          </Text>
          <Heading size="md" noOfLines={2} fontFamily="navbar" fontWeight="500">
            {foodItem.food_name}
          </Heading>
        </Box>
      </VStack>

      <HStack px={4} pb={4} spacing={4} justify="space-between">
        <Box flex="1">
          <Text fontSize="sm">Calories</Text>
          <Text fontSize="lg" fontWeight="600">
            {foodItem.full_nutrients[3].value}kcal
          </Text>
        </Box>
        <Box flex="1">
          <Text fontSize="sm">Protein</Text>
          <Text fontSize="lg" fontWeight="600">
            {foodItem.full_nutrients[0].value}g
          </Text>
        </Box>
        <Box flex="1">
          <Text fontSize="sm">Fat</Text>
          <Text fontSize="lg" fontWeight="600">
            {foodItem.full_nutrients[1].value}g
          </Text>
        </Box>
        <Box flex="1">
          <Text fontSize="sm">Carbohydrates</Text>
          <Text fontSize="lg" fontWeight="600">
            {foodItem.full_nutrients[2].value}g
          </Text>
        </Box>
      </HStack>
      {selectedMeal && (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent w="90%" h="90%" borderWidth="1px" borderRadius="15">
            <DetailedFoodModalContent
              meal={selectedMeal}
              onClose={closeModal}
            />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default FoodCard;
