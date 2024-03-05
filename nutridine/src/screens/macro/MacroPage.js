import React, { useState, useEffect } from "react";
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
import { fetchMealsByMacros } from "../../hooks/useMealsByMacros";
import { useMeals } from "../../contexts/MealsContext";

function AttributeSliders() {
  const { setMeals } = useMeals();
  const [macros, setMacros] = useState({
    query: "",
    calories: [200, 500],
    protein: [10, 50],
    carbs: [20, 100],
    fat: [5, 35],
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
        duration: 9000,
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
      console.log(response.data);
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

  return (
    <Box
      maxWidth={["100vw", "100vw", "80vw", "80vw"]}
      justifyContent={"center"}
      width="100%"
    >
      {isLoading && <Text>Loading...</Text>}
      {error && <Text color="red.500">Error: {error.message}</Text>}
      {showSliders && (
        <VStack spacing={8} p={5}>
          <Text fontSize={"xl"} fontWeight="bold" mb={"1"}>
            Nutrient Range Selectors
          </Text>
          <Text
            fontFamily={"navbar"}
            fontSize={["md", "md", "lg", "lg"]}
            mb={"4"}
          >
            This page can be used to filter and search food items based on
            calorie, protein, carbohydrates, and fat.
          </Text>
          {macroSettings.map(({ name, label, min, max }) => (
            <Card
              key={name}
              w="full"
              mb="4"
              borderRadius={30}
              variant={"elevated"}
              bg={cardBg}
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
                  aria-label={[`min-${name}`, `max-${name}`]}
                  onChange={(val) => handleSliderChange(name, val)}
                  value={macros[name]}
                  min={min}
                  max={max}
                  colorScheme={"green"}
                  minStepsBetweenThumbs={20}
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
                    width={"100px"}
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
                    width={"100px"}
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
      )}
      <VStack spacing={8} p={5}>
        <Button
          size={["md", "md", "md", "lg"]}
          bg={buttonBg}
          onClick={
            showSliders ? handleSubmit : () => setShowSliders(!showSliders)
          }
          p={5}
        >
          {showSliders ? "Submit" : "Show Sliders"}
        </Button>
      </VStack>
    </Box>
  );
}

export default AttributeSliders;
