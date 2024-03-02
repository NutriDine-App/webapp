import { Box, Text, Image, Heading, HStack } from "@chakra-ui/react";
import useMealsByMacros from "../hooks/useMealsByMacros";
import nutritionIxIds from "../constants/nutritionIxIds";
import nutritionIx_credit from "../images/nutritionIx_credit.png";

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

  return (
    <Box>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Box>
          {meals.length === 0 && <Text>No meals found</Text>}
          {meals.map((meal) => (
            <Box key={meal.food_name} mb="1rem">
              <Heading fontSize={"xl"}>{meal.food_name}</Heading>
              <Heading fontSize={"xl"}>{meal.brand_name}</Heading>
              <HStack>
                {meal.full_nutrients.map((nutrient) => (
                  <Text key={nutrient.attr_id}>
                    {nutrient.attr_id === nutritionIxIds.protein &&
                      `Protein: ${nutrient.value}g`}
                    {nutrient.attr_id === nutritionIxIds.fat &&
                      `Fat: ${nutrient.value}g`}
                    {nutrient.attr_id === nutritionIxIds.carbohydrates &&
                      `Carbohydrates: ${nutrient.value}g`}
                    {nutrient.attr_id === nutritionIxIds.calories &&
                      `Calories: ${nutrient.value}kcal`}
                  </Text>
                ))}
              </HStack>
            </Box>
          ))}
        </Box>
      )}
      <Box bg="white">
        <Image maxH="50px" src={nutritionIx_credit} />
      </Box>
    </Box>
  );
}
