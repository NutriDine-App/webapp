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
  Input,
  useColorModeValue,
  Card,
  CardBody,
} from "@chakra-ui/react";

function AttributeSliders() {
  const [calories, setCalories] = useState([200, 500]);
  const [protein, setProtein] = useState([10, 50]);
  const [carbs, setCarbs] = useState([20, 100]);
  const [fat, setFat] = useState([5, 35]);

  const handleInputChange = (index, value, setValue, inputValue) => {
    const newValue = [...value];
    newValue[index] = Number(inputValue);
    setValue(newValue);
  };

  const handleSubmit = () => {
    console.log({ calories, protein, carbs, fat });
  };

  const buttonBg = useColorModeValue("light.primary.500", "dark.primary.600");
  const sliderBg = useColorModeValue("gray.300", "dark.primary.500");
  return (
    <VStack
      spacing={8}
      p={5}
      display="flex"
      justify={["center", "center", "flex-start", "flex-start"]}
      align={["center", "center", "flex-start", "flex-start"]}
    >
      <Text fontSize={"xl"} fontWeight="bold" mb={"1rem"}>
        Nutrient Range Selectors
      </Text>
      {[
        {
          label: "Calories",
          value: calories,
          setValue: setCalories,
          min: 0,
          max: 3000,
          colorScheme: "red",
        },
        {
          label: "Protein (g)",
          value: protein,
          setValue: setProtein,
          min: 0,
          max: 50,
          colorScheme: "pink",
        },
        {
          label: "Carbs (g)",
          value: carbs,
          setValue: setCarbs,
          min: 0,
          max: 80,
          colorScheme: "blue",
        },
        {
          label: "Fat (g)",
          value: fat,
          setValue: setFat,
          min: 0,
          max: 50,
          colorScheme: "yellow",
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
              colorScheme={item.colorScheme}
            >
              <RangeSliderTrack bg={sliderBg}>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0}></RangeSliderThumb>
              <RangeSliderThumb index={1}></RangeSliderThumb>
            </RangeSlider>
            <HStack justify="center" mt={2}>
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
      <Button
        size={["md", "md", "md", "lg"]}
        bg={buttonBg}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </VStack>
  );
}

export default AttributeSliders;
