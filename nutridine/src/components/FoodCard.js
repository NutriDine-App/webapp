import {
  Box,
  Text,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import useMealsByMacros from "../hooks/useMealsByMacros";
import { useState } from "react";
import DetailedFoodModalContent from "./DetailedFoodModalContent";

export default function FoodCard() {
  // Restricts search to only these brand IDs
  const desiredMacros = {
    query: "",
    minCalories: 600,
    maxCalories: 1000,
    minProtein: 30,
    maxProtein: 100,
    minCarbs: 1,
    maxCarbs: 50,
    minFat: 1,
    maxFat: 40,
  };
  const { meals, loading, error } = useMealsByMacros(desiredMacros);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const openModal = (meal) => {
    setSelectedMeal(meal);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setIsOpen(false);
  };

  return (
    <Box border="2px solid black">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Box>
          {meals.length === 0 && <Text>No meals found</Text>}
          {meals.map((meal) => (
            <Box
              key={meal.food_name}
              m="1rem"
              p="1rem"
              border="2px solid black"
              onClick={() => openModal(meal)}
            >
              <Heading fontSize="xl">{meal.food_name}</Heading>
            </Box>
          ))}
          {selectedMeal && (
            <Modal isOpen={isOpen} onClose={closeModal}>
              <ModalOverlay />
              <ModalContent w="90%" h="90%">
                <DetailedFoodModalContent
                  meal={selectedMeal}
                  onClose={closeModal}
                />
              </ModalContent>
            </Modal>
          )}
        </Box>
      )}
    </Box>
  );
}
