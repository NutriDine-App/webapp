import React, { useState } from 'react';
import { VStack, Box, Input, SimpleGrid, useBreakpointValue, useColorMode } from '@chakra-ui/react';

import FilterGroup from '../components/FilterGroup';
import FoodCardList from '../components/FoodDisplay/FoodCardList';

import mockMeals from '../constants/mockData/meals';

function Homepage() {
    const { colorMode } = useColorMode();

    const filters = ['Burgers', 'Salads', 'Sushi', 'Pasta'];

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (item) => {
        setSelectedItems((prevItems) =>
            prevItems.includes(item) ? prevItems.filter((prevItem) => prevItem !== item) : [...prevItems, item]
        );
    };

    // const filteredFoodItems = mockMeals.filter((item) => selectedItems.includes(item));

    const isLargerScreen = useBreakpointValue({ base: false, md: false, lg: true });
    const meals = mockMeals;

    console.log(meals);

    return (
        <Box
            position="relative"
            width={["100vw", "550px"]}
            px={[8, 8, 0]}
            display="flex"
            flexDirection="column"
        >
            <Input placeholder="Search for food..." mb={4} height="50px" borderRadius="15px" />

            {isLargerScreen ? (
                <Box
                    position="absolute"
                    left="-130px"
                    bg={colorMode === "dark" ? "gray.700" : "gray.50"}
                    p={3}
                    borderWidth={1}
                    borderRadius={15}
                >
                    <FilterGroup
                        filters={filters}
                        onSelectItem={handleSelectItem}
                        selectedItems={selectedItems}
                    />
                </Box>
            ) :
                <Box mb={5}>
                    <FilterGroup
                        filters={filters}
                        onSelectItem={handleSelectItem}
                        selectedItems={selectedItems}
                    />
                </Box>
            }

            <FoodCardList meals={meals} />
        </Box>
    );
}

export default Homepage;
