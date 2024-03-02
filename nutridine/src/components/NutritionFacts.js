import React from "react";
import { Box, Heading, HStack, VStack, Text, Divider } from "@chakra-ui/react";

function NutritionFacts({ detailedMeal }) {
  const {
    nf_calories,
    nf_total_fat,
    nf_saturated_fat,
    nf_cholesterol,
    nf_total_carbohydrate,
    nf_dietary_fiber,
    nf_sugars,
    nf_protein,
    nf_sodium,
    full_nutrients,
    serving_qty,
    serving_unit,
    serving_weight_grams,
  } = detailedMeal;
  const trans_fat =
    full_nutrients.find((nutrient) => nutrient.attr_id === 605)?.value ?? 0;

  // Based on Health Candada's Dietary Reference Intakes
  const dailyMax = {
    calories: 2000, // calories
    totalFat: 65, // g
    saturatedFat: 20, // g
    cholesterol: 300, // mg
    sodium: 2300, // mg
    totalCarbohydrate: 300, // g
    dietaryFiber: 28, // g
    sugars: 50, // g
    protein: 50, // g
  };
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" maxW="md">
      {/* NUTRITION FACTS */}
      <Heading as="h2" size="xl">
        Nutrition Facts
      </Heading>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* TOTAL SERVINGS */}
      <VStack alignItems={"flex-start"}>
        <Text mb="-10px">{`${serving_qty} servings per ${serving_unit}`}</Text>
        <HStack justifyContent={"space-between"} w="100%">
          <Text>
            <b>Serving Size</b>
          </Text>
          <Text>
            <b>{`${serving_weight_grams}g`}</b>
          </Text>
        </HStack>
      </VStack>

      {/* AMOUNT PER SERVING */}
      <Divider borderBottomWidth="10px" borderColor="black" my="2px" />
      <Heading size="sm">Amount Per Serving</Heading>

      {/* CALORIES */}
      <HStack justify={"space-between"} alignItems={"flex-end"}>
        <Heading as="h3">Calories</Heading>
        <Heading as="h3" fontSize={"3xl"}>
          {nf_calories ?? 0}
        </Heading>
      </HStack>
      <Divider borderBottomWidth="8px" borderColor="black" my="2px" />

      {/* DAILY VALUE */}
      <HStack justifyContent={"flex-end"}>
        <Text>
          <b>% Daily Value*</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* FAT */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Total Fat</b>
          </Text>
          <Text>{nf_total_fat ?? 0}g</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_total_fat / dailyMax.totalFat) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />
      <HStack justifyContent={"space-between"}>
        <HStack ml={"2rem"}>
          <Text>Saturated Fat</Text>
          <Text>{nf_saturated_fat ?? 0}g</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_saturated_fat / dailyMax.saturatedFat) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />
      <HStack ml={"2rem"}>
        <Text>Trans Fat</Text>
        <Text>{trans_fat ?? 0}g</Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* CHOLESTREROL */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Cholesterol</b>
          </Text>
          <Text>{nf_cholesterol ?? 0}mg</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_cholesterol / dailyMax.cholesterol) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* SODIUM */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Sodium</b>
          </Text>
          <Text>{nf_sodium ?? 0}mg</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_sodium / dailyMax.sodium) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* TOTAL CARBOHYDRATES */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Total Carbohydrates</b>
          </Text>
          <Text>{nf_total_carbohydrate ?? 0}g</Text>
        </HStack>
        <Text>
          <b>
            {Math.round(
              (nf_total_carbohydrate / dailyMax.totalCarbohydrate) * 100
            )}
            %
          </b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />
      <HStack justifyContent={"space-between"}>
        <HStack ml={"2rem"}>
          <Text>Dietary Fiber</Text>
          <Text>{nf_dietary_fiber ?? 0}g</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_dietary_fiber / dailyMax.dietaryFiber) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />
      <HStack ml={"2rem"}>
        <Text>Total Sugars</Text>
        <Text>{nf_sugars ?? 0}g</Text>
      </HStack>
      <Divider borderBottomWidth="1px" borderColor="black" my="1" />

      {/* PROTEIN */}
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text>
            <b>Protein</b>
          </Text>
          <Text>{nf_protein ?? 0}g</Text>
        </HStack>
        <Text>
          <b>{Math.round((nf_protein / dailyMax.protein) * 100)}%</b>
        </Text>
      </HStack>
      <Divider borderBottomWidth="8px" borderColor="black" my="2px" />

      <HStack alignItems={"flex-start"}>
        <Text>*</Text>
        <Text fontSize="xs">
          The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.
        </Text>
      </HStack>
      {/* TOP 4 VITAMINS/MINERALS/CAFFEINE if time permits */}
    </Box>
  );
}

export default NutritionFacts;
