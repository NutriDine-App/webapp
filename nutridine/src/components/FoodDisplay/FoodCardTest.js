import { Box, Text, Image, Heading, HStack } from "@chakra-ui/react";
import useMealsByMacros from "../../hooks/useMealsByMacros";
import nutritionIxIds from "../../constants/nutritionIxIds";
import nutritionIx_credit from "../../images/nutritionIx_credit.png";
import FoodCard from "./FoodCard";
import FoodCardList from "./FoodCardList";

export default function FoodCardTest() {
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
          <FoodCardList meals={meals} />
        </Box>
      )}
      <Box bg="white">
        <Image maxH="50px" src={nutritionIx_credit} />
      </Box>
    </Box>
  );
}
