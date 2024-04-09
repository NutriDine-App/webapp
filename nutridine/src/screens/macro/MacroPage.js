import React, { useState } from "react";
import {
  Button,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  VStack,
  Text,
  HStack,
  useColorModeValue,
  Card,
  CardBody,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { fetchMealsByMacros } from "../../hooks/Meals/useMealsByMacros";
import { useMeals } from "../../contexts/MealsContext";
import FoodCardList from "../../components/FoodDisplay/FoodCardList";

function AttributeSliders() {
  const { meals, setMeals } = useMeals();
  const [macros, setMacros] = useState({
    query: "",
    calories: [500, 1200],
    protein: [10, 30],
    carbs: [10, 45],
    fat: [5, 18],
  });
  const [showSliders, setShowSliders] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSliderChange = (name, value) => {
    setMacros((prev) => ({ ...prev, [name]: value }));
  };

  const toast = useToast();

  const handleSubmit = async () => {
    let invalidSliders = [];
    Object.entries(macros).forEach(([key, [min, max]]) => {
      if (min > max) {
        invalidSliders.push(
          macroSettings.find((slider) => slider.name === key).label
        );
      }
    });

    if (invalidSliders.length > 0) {
      const invalidSliderNames = invalidSliders.join(", ");
      toast({
        title: "Invalid range values detected.",
        description: `The following have invalid ranges where the minimum value exceeds the maximum value: ${invalidSliderNames}. Please adjust these ranges and try again.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const params = {
      query: macros.query,
      minCalories: macros.calories[0],
      maxCalories: macros.calories[1],
      minProtein: macros.protein[0],
      maxProtein: macros.protein[1],
      minCarbs: macros.carbs[0],
      maxCarbs: macros.carbs[1],
      minFat: macros.fat[0],
      maxFat: macros.fat[1],
    };

    try {
      const response = await fetchMealsByMacros(params);
      if (response.error) {
        setError(response.error);
        console.error("Failed to fetch meals:", response.error);
      } else {
        setMeals(response.data);
        setError(null);
      }
    } catch (err) {
      setError(err);
      console.error("An unexpected error occurred:", err);
    }
    setIsLoading(false);
    setShowSliders(false);
  };

  const macroSettings = [
    { name: "calories", label: "Calories", min: 0, max: 5000 },
    { name: "protein", label: "Protein (g)", min: 0, max: 100 },
    { name: "carbs", label: "Carbohydrates (g)", min: 0, max: 100 },
    { name: "fat", label: "Fat (g)", min: 0, max: 100 },
  ];

  const sliderBg = useColorModeValue("gray.300", "dark.primary.800");
  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonHover = useColorModeValue(
    "light.primary.400",
    "dark.primary.400"
  );

  return (
    <Box
      width={["100vw", "550px"]}
      display={"flex"}
      flexDirection={"column"}
      alignItems="flex-start"
      pb={10}
    >
      {isLoading && <Text>Loading...</Text>}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {showSliders ? (
        <VStack spacing={5} p={0} align="stretch" px={[8, 8, 0]}>
          <Box>
            <Text fontSize={"xl"} mb={"3"}>
              Macronutrient Filter
            </Text>
            <Text fontFamily={"navbar"} fontSize={["md", "md", "lg", "lg"]}>
              Set your desired macronutrient ranges and click 'Submit' to search
              for matching foods.
            </Text>
          </Box>
          {macroSettings.map(({ name, label, min, max }) => (
            <Card
              key={name}
              width="100%"
              borderWidth="1px"
              borderColor={borderColor}
              borderRadius="15"
              overflow="hidden"
              bg={cardBg}
              fontFamily={"navbar"}
            >
              <CardBody>
                <Text
                  fontSize={["md", "md", "lg", "xl"]}
                  fontFamily={"navbar"}
                  mb={2}
                >
                  {label}
                </Text>
                <RangeSlider
                  aria-label={[`min-${name}`, `max-${name}`].toString()}
                  onChange={(val) => handleSliderChange(name, val)}
                  value={macros[name]}
                  min={min}
                  max={max}
                  colorScheme={"green"}
                  minStepsBetweenThumbs={10}
                >
                  <RangeSliderTrack bg={sliderBg}>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb
                    index={0}
                    border={`1px solid #A0AEC0`}
                    boxSize="18px"
                  />
                  <RangeSliderThumb
                    index={1}
                    boxSize="18px"
                    border={`1px solid #A0AEC0`}
                  />
                </RangeSlider>
                <HStack justify="center" mt={2}>
                  <Text fontFamily={"navbar"} fontWeight={"500"}>
                    Min
                  </Text>
                  <NumberInput
                    value={macros[name][0]}
                    min={min}
                    max={macros[name][1]}
                    onChange={(valueString) =>
                      handleSliderChange(name, [
                        Number(valueString),
                        macros[name][1],
                      ])
                    }
                    keepWithinRange={true}
                    clampValueOnBlur={false}
                    width={"90px"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontFamily={"navbar"} fontWeight={"500"}>
                    Max
                  </Text>
                  <NumberInput
                    value={macros[name][1]}
                    min={macros[name][0]}
                    max={max}
                    onChange={(valueString) =>
                      handleSliderChange(name, [
                        macros[name][0],
                        Number(valueString),
                      ])
                    }
                    keepWithinRange={true}
                    clampValueOnBlur={false}
                    width={"90px"}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </HStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      ) : (
        <VStack spacing={5} p={0} width="100%" align="stretch" px={[8, 8, 0]}>
          {!meals ? (
            <Text>No Meals Found</Text>
          ) : (
            <>
              <Text fontSize={"xl"}>Filtered Food Results</Text>

              <FoodCardList meals={meals} />
            </>
          )}
        </VStack>
      )}
      <HStack
        w="full"
        justify={showSliders ? "flex-end" : "flex-start"}
        p={0}
        mt={6}
        px={[8, 8, 0]}
      >
        <Button
          bg={buttonBg}
          onClick={
            showSliders ? handleSubmit : () => setShowSliders(!showSliders)
          }
          p={6}
          borderRadius={15}
          fontWeight="normal"
          width="150px"
          _hover={{ bg: buttonHover }}
        >
          {showSliders ? "Search " : "Edit Ranges"}
        </Button>
      </HStack>
    </Box>
  );
}

export default AttributeSliders;
