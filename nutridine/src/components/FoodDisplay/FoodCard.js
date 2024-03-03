import React from 'react';
import { Box, Text, Heading, VStack, HStack } from "@chakra-ui/react";
import nutritionIxIds from "../../constants/nutritionIxIds";

function FoodCard({ foodItem }) {
    return (
        <Box
            width="100%"
            maxW="600px"
            borderWidth="1px"
            borderRadius="15"
            overflow="hidden"
            bg="white"
            _hover={{ shadow: "md" }}
        >
            <VStack align="start" justify="space-between" p={4} spacing={4} w="full">
                <Box>
                    <Text fontSize='xs' color="gray.500">{foodItem.brand_name}</Text>
                    <Heading size='md' noOfLines={2}>{foodItem.food_name}</Heading>
                </Box>
            </VStack>

            <HStack px={4} pb={4} spacing={4} justify="space-between">
                <Box flex="1">
                    <Text fontSize='sm'>Calories</Text>
                    <Text fontSize='lg' fontWeight="bold">{foodItem.full_nutrients[3].value}kcal</Text>
                </Box>
                <Box flex="1">
                    <Text fontSize='sm'>Protein</Text>
                    <Text fontSize='lg' fontWeight="bold">{foodItem.full_nutrients[0].value}g</Text>
                </Box>
                <Box flex="1">
                    <Text fontSize='sm'>Fat</Text>
                    <Text fontSize='lg' fontWeight="bold">{foodItem.full_nutrients[1].value}g</Text>
                </Box>
                <Box flex="1">
                    <Text fontSize='sm'>Carbs</Text>
                    <Text fontSize='lg' fontWeight="bold">{foodItem.full_nutrients[2].value}g</Text>
                </Box>
            </HStack>
        </Box>
    );
}

export default FoodCard;
