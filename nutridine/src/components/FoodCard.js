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
// import nutritionIxIds from "../constants/nutritionIxIds";
// import nutritionIx_credit from "../images/nutritionIx_credit.png";

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

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

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
              onClick={openModal}
            >
              <Heading fontSize={"xl"}>{meal.food_name}</Heading>
              <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                  <DetailedFoodModalContent meal={meal} onClose={closeModal} />
                </ModalContent>
              </Modal>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );

  // return (
  //   <Box>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : error ? (
  //       <p>Error: {error.message}</p>
  //     ) : (
  //       <Box>
  //         {meals.length === 0 && <Text>No meals found</Text>}
  //         {meals.map((meal) => (
  //           <Box key={meal.food_name} mb="1rem">
  //             <Heading fontSize={"xl"}>{meal.food_name}</Heading>
  //             <Heading fontSize={"xl"}>{meal.brand_name}</Heading>
  //             <HStack>
  //               {meal.full_nutrients.map((nutrient) => (
  //                 <Text key={nutrient.attr_id}>
  //                   {nutrient.attr_id === nutritionIxIds.protein &&
  //                     `Protein: ${nutrient.value}g`}
  //                   {nutrient.attr_id === nutritionIxIds.fat &&
  //                     `Fat: ${nutrient.value}g`}
  //                   {nutrient.attr_id === nutritionIxIds.carbohydrates &&
  //                     `Carbohydrates: ${nutrient.value}g`}
  //                   {nutrient.attr_id === nutritionIxIds.calories &&
  //                     `Calories: ${nutrient.value}kcal`}
  //                 </Text>
  //               ))}
  //             </HStack>
  //           </Box>
  //         ))}
  //       </Box>
  //     )}
  //     <Box bg="white">
  //       <Image maxH="50px" src={nutritionIx_credit} />
  //     </Box>
  //   </Box>
  // );
}
