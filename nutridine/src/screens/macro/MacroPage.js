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
  Input,
  useColorModeValue,
  Card,
  CardBody,
  Box,
} from "@chakra-ui/react";
import useMealsByMacros from "../../hooks/useMealsByMacros";
import { useMeals } from "../../contexts/MealsContext";

function AttributeSliders() {
  const { setMeals } = useMeals();

  const [calories, setCalories] = useState([200, 500]);
  const [protein, setProtein] = useState([10, 50]);
  const [carbs, setCarbs] = useState([20, 100]);
  const [fat, setFat] = useState([5, 35]);

  const [showSliders, setShowSliders] = useState(true);
  const [desiredMacros, setDesiredMacros] = useState({
    query: "",
    minCalories: 0,
    maxCalories: 0,
    minProtein: 0,
    maxProtein: 0,
    minCarbs: 0,
    maxCarbs: 0,
    minFat: 0,
    maxFat: 0,
  });

  const { meals, loading, error } = useMealsByMacros(desiredMacros);

  const handleInputChange = (index, value, setValue, inputValue) => {
    const newValue = [...value];
    newValue[index] = Number(inputValue);
    setValue(newValue);
  };

  const handleSubmit = () => {
    setDesiredMacros({
      query: " d",
      minCalories: calories[0],
      maxCalories: calories[1],
      minProtein: protein[0],
      maxProtein: protein[1],
      minCarbs: carbs[0],
      maxCarbs: carbs[1],
      minFat: fat[0],
      maxFat: fat[1],
    });
    setShowSliders(false);
    // setShouldFetch(true);
    // fetchData();
  };

  useEffect(() => {
    if (!loading && meals) {
      setMeals(meals);
      console.log(meals);
    }
  }, [meals, loading, error, setMeals]);

  const toggleSlidersVisibility = () => setShowSliders(!showSliders);

  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const sliderBg = useColorModeValue("gray.300", "dark.primary.500");

  return (
    <Box maxWidth={["100vw", "100vw", "80vw", "80vw"]}>
      {showSliders && (
        <VStack
          spacing={8}
          p={5}
          display="flex"
          justify={["center", "center", "flex-start", "flex-start"]}
          align={["center", "center", "flex-start", "flex-start"]}
        >
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
          {[
            {
              label: "Calories",
              value: calories,
              setValue: setCalories,
              min: 0,
              max: 10000,
            },
            {
              label: "Protein (g)",
              value: protein,
              setValue: setProtein,
              min: 0,
              max: 100,
            },
            {
              label: "Carbohydrates (g)",
              value: carbs,
              setValue: setCarbs,
              min: 0,
              max: 100,
            },
            {
              label: "Fat (g)",
              value: fat,
              setValue: setFat,
              min: 0,
              max: 100,
            },
          ].map((item, index) => (
            <Card key={index} w="full" mb="4">
              <CardBody>
                <Text
                  fontSize={["md", "md", "lg", "xl"]}
                  fontFamily={"navbar"}
                  mb={2}
                >
                  {item.label}
                </Text>
                <RangeSlider
                  aria-label={[`min${item.label}`, `max${item.label}`]}
                  onChange={(val) => item.setValue(val)}
                  value={item.value}
                  min={item.min}
                  max={item.max}
                  colorScheme={"green"}
                >
                  <RangeSliderTrack bg={sliderBg}>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0}></RangeSliderThumb>
                  <RangeSliderThumb index={1}></RangeSliderThumb>
                </RangeSlider>
                <HStack justify="center" mt={2}>
                  <Text fontFamily={"navbar"} fontWeight={"500"}>
                    Min
                  </Text>
                  <Input
                    value={item.value[0]}
                    onChange={(e) =>
                      handleInputChange(
                        0,
                        item.value,
                        item.setValue,
                        e.target.value
                      )
                    }
                    size="sm"
                    width="100px"
                    mr={2}
                  />
                  <Text fontFamily={"navbar"} fontWeight={"500"}>
                    Max
                  </Text>
                  <Input
                    value={item.value[1]}
                    onChange={(e) =>
                      handleInputChange(
                        1,
                        item.value,
                        item.setValue,
                        e.target.value
                      )
                    }
                    size="sm"
                    width="100px"
                  />
                </HStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      )}
      <VStack
        spacing={8}
        p={5}
        display="flex"
        justify={["center", "center", "flex-start", "flex-start"]}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Button
          size={["md", "md", "md", "lg"]}
          bg={buttonBg}
          onClick={showSliders ? handleSubmit : toggleSlidersVisibility}
          p={5}
        >
          {showSliders ? "Submit" : "Show Sliders"}{" "}
        </Button>
      </VStack>

      {meals && (
        <VStack spacing={4}>
          {meals.map((meal, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px">
              <Text mt={4}>{meal.food_name}</Text>{" "}
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export default AttributeSliders;
