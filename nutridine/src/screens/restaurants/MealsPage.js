import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FoodCardList from "../../components/FoodDisplay/FoodCardList";
import {
  Button,
  Center,
  VStack,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import useMealsByRestaurant from "../../hooks/Meals/useMealsByRestaurant";

function MealsPage() {
  let location = useLocation();
  let navigate = useNavigate();
  let { selectedRestaurant } = location.state || {};

  const { meals, loading, error } = useMealsByRestaurant(selectedRestaurant);
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const buttonHover = useColorModeValue(
    "light.primary.400",
    "dark.primary.400"
  );

  if (!selectedRestaurant) {
    navigate("/restaurants");
    return null;
  }

  if (loading) return <Center>Loading...</Center>;
  if (error) return <Center>Error: {error.message}</Center>;

  return (
    <Box
      width={["100vw", "550px"]}
      display={"flex"}
      flexDirection={"column"}
      alignItems="flex-start"
      pb={10}
    >
      <VStack spacing={5} p={0} width="100%" align="stretch" px={[8, 8, 0]}>
        <Button
          bg={buttonBg}
          onClick={() => navigate("/restaurants")}
          _hover={{ bg: buttonHover }}
          p={6}
          borderRadius={15}
          fontWeight="normal"
        >
          Back to Restaurants
        </Button>
        <FoodCardList meals={meals} />
      </VStack>
    </Box>
  );
}

export default MealsPage;
