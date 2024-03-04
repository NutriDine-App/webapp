import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Image,
  Box,
} from "@chakra-ui/react";
import useMealById from "../hooks/useMealById";
import LoadingSpinner from "./LoadingSpinner";
import NutritionFacts from "./NutritionFacts";

export default function DetailedFoodModalContent({ meal, onClose }) {
  const { nix_item_id } = meal;
  const { detailedMeal, loading, error } = useMealById({ nix_item_id });

  return (
    <Box
      fontFamily={"navbar"}
      overflowY={"scroll"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <ModalHeader>
        <VStack alignItems={"flex-start"}>
          <Text fontSize={"2xl"}>
            <b>{detailedMeal ? detailedMeal.food_name : ""}</b>
          </Text>
          <Text fontSize={"xl"}>
            {detailedMeal ? detailedMeal.brand_name : ""}
          </Text>
        </VStack>
      </ModalHeader>
      <ModalCloseButton
        bg={"light.primary.600"}
        zIndex={1}
        color={"white"}
        _hover={{ bg: "light.primary.700" }}
        mr={3}
        onClick={onClose}
      />

      <ModalBody>
        {loading ? (
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
            <NutritionFacts detailedMeal={detailedMeal} />
            <Image
              src={detailedMeal.photo?.thumb}
              alt={detailedMeal.food_name}
            />
          </VStack>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          bg={"light.primary.600"}
          color={"white"}
          _hover={{ bg: "light.primary.700" }}
          mr={3}
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </Box>
  );
}
