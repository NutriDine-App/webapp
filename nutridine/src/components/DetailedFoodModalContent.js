import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Image,
  Box,
  useColorModeValue,
  useColorMode,
  Heading
} from "@chakra-ui/react";
import useMealById from "../hooks/Meals/useMealById";
import LoadingSpinner from "./LoadingSpinner";
import NutritionFacts from "./NutritionFacts";
import useNutrientPreferences from "../hooks/useNutrientPreferences";
import { useAuth } from "../contexts/AuthContext";
import { getCurrentUser } from "../hooks/AuthService/authService";

export default function DetailedFoodModalContent({ meal, onClose }) {
  const { colorMode } = useColorMode();
  const { nix_item_id } = meal;
  const currentUser = getCurrentUser();
  const {
    detailedMeal,
    loading: detailedMealIsLoading,
    error,
  } = useMealById({ nix_item_id });
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.500");
  const buttonHover = useColorModeValue(
    "light.primary.200",
    "dark.primary.400"
  );
  const buttonTextColor = useColorModeValue("black", "white");
  const { isLoading: nutrientPreferencesIsLoading, nutrientPreferences } =
    useNutrientPreferences(currentUser.uid);

  return (
    <Box
      fontFamily={"navbar"}
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalHeader
        sx={{
          pb: 0,
        }}
      >
        <VStack alignItems={"flex-start"}>
          <Text
            fontSize="sm"
            color={colorMode === "dark" ? "gray.300" : "gray.500"}
            fontWeight="normal"
          >
            {detailedMeal ? detailedMeal.brand_name : ""}
          </Text>
          <Heading size="md" noOfLines={2} fontFamily="navbar" fontWeight="500">
            {detailedMeal ? detailedMeal.food_name : ""}
          </Heading>
        </VStack>
      </ModalHeader>
      <ModalCloseButton
        bg={buttonBg}
        zIndex={1}
        color={buttonTextColor}
        _hover={{ bg: buttonHover }}
        mr={3}
        mt={2.5}
        onClick={onClose}
        boxShadow={"0px 4px 6px rgba(0, 0, 0, 0.1)"}
      />

      <ModalBody mb="1.5rem"
        sx={{
          pt: 0,
        }}>
        {detailedMealIsLoading || nutrientPreferencesIsLoading ? (
          <Box
            w="100%"
            h="80%"
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LoadingSpinner />
          </Box>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <VStack alignItems={"center"} justifyContent={"center"}>
            <NutritionFacts
              detailedMeal={detailedMeal}
              nutrientPreferences={nutrientPreferences}
            />
          </VStack>
        )}
      </ModalBody>
    </Box>
  );
}
