import React, { useState, useEffect } from 'react';
import { Box, Input, useBreakpointValue, useColorMode, Text } from '@chakra-ui/react';
import { debounce } from 'lodash';

import FilterGroup from '../components/FilterGroup';
import FoodCardList from '../components/FoodDisplay/FoodCardList';
import useMealsByQuery from '../hooks/Meals/useMealsByQuery';

function Homepage() {
    const { colorMode } = useColorMode();
    const filters = ['Burger', 'Sushi', 'Pizza', 'Chicken'];
    const [selectedItems, setSelectedItems] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const handleSelectItem = (item) => {
        setSelectedItems((prevItems) =>
            prevItems.includes(item) ? prevItems.filter((prevItem) => prevItem !== item) : [...prevItems, item]
        );
    };

    useEffect(() => {
        const handler = debounce(() => {
            if (searchTerm.length >= 3) {
                setDebouncedSearchTerm(searchTerm);
            } else {
                setDebouncedSearchTerm("");
            }
        }, 300);

        handler();

        return () => {
            handler.cancel();
        };
    }, [searchTerm]);

    // Combine debounced search term and selected filters into a single query
    const query = (debouncedSearchTerm + " " + selectedItems.join(" ")).trim().toLowerCase();
    const { meals, loading, error } = useMealsByQuery(query);

    const isLargerScreen = useBreakpointValue({ base: false, md: false, lg: true });

    return (
        <Box
            position="relative"
            width={["100vw", "550px"]}
            px={[8, 8, 0]}
            display="flex"
            flexDirection="column"
        >
            <Input
                placeholder="Search for food..."
                mb={4}
                height="50px"
                borderRadius="15px"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

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
            ) : (
                <Box
                    mb={5}
                    overflowX="auto"
                    sx={{
                        paddingBottom: '8px',
                        '&::-webkit-scrollbar': {
                            height: '4px',
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `rgba(0, 0, 0, 0.2)`,
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: `rgba(0, 0, 0, 0.5)`,
                        },
                    }}
                >
                    <FilterGroup
                        filters={filters}
                        onSelectItem={handleSelectItem}
                        selectedItems={selectedItems}
                    />
                </Box>
            )}

            {loading && <Text>Loading...</Text>}
            {error && <Text>Failed to fetch meals.</Text>}
            <FoodCardList meals={meals} />
        </Box>
    );
}

export default Homepage;