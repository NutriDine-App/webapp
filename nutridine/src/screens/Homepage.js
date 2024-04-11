import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  useBreakpointValue,
  useColorMode,
  Text,
  Center,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { debounce } from "lodash";

import FilterGroup from "../components/FilterGroup";
import FoodCardList from "../components/FoodDisplay/FoodCardList";
import useMealsByQuery from "../hooks/Meals/useMealsByQuery";
import LoadingSpinner from "../components/LoadingSpinner";

function Homepage() {
  const { colorMode } = useColorMode();

  const filters = ["High Protein", "Low Calorie", "Low Fat"];
  const foodTypes = [
    "Salad",
    "Soup",
    "Smoothie",
    "Sushi",
    "Pasta",
    "Hamburger",
    "Pizza",
    "Mexican",
    "Indian",
    "Vietnamese",
    "Italian",
    "Greek",
    "Spanish",
  ];

  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedFoodItems, setSelectedFoodItems] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [filteredMeals, setFilteredMeals] = useState([]);

  const handleSelectItem = (item) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((prevItem) => prevItem !== item)
        : [...prevItems, item]
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
  const query = (debouncedSearchTerm + " " + selectedFoodItems.join(" "))
    .trim()
    .toLowerCase();

  const { meals, loading, error } = useMealsByQuery(query);

  // Filter
  useEffect(() => {
    let newFilteredMeals = meals;

    if (selectedFilters.includes("High Protein")) {
      newFilteredMeals = newFilteredMeals.filter((meal) => {
        const protein =
          meal.full_nutrients.find((nutrient) => nutrient.attr_id === 203)
            ?.value || 0;
        return protein >= 35;
      });
    }

    if (selectedFilters.includes("Low Calorie")) {
      newFilteredMeals = newFilteredMeals.filter((meal) => {
        const calories =
          meal.full_nutrients.find((nutrient) => nutrient.attr_id === 208)
            ?.value || 0;
        return calories <= 500;
      });
    }

    if (selectedFilters.includes("Low Fat")) {
      newFilteredMeals = newFilteredMeals.filter((meal) => {
        const fat =
          meal.full_nutrients.find((nutrient) => nutrient.attr_id === 204)
            ?.value || 0;
        return fat <= 10;
      });
    }

    setFilteredMeals(newFilteredMeals);
  }, [meals, selectedFilters]);

  const isLargerScreen = useBreakpointValue({
    base: false,
    md: false,
    lg: true,
  });

  const vStackStyles = {
    alignItems: isLargerScreen ? "end" : "left",
    position: isLargerScreen ? "absolute" : "relative",
    left: isLargerScreen ? "-130px" : "0",
    spacing: 3,
    mb: !isLargerScreen ? 5 : 0,
  };

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

      <VStack {...vStackStyles}>
        <FilterGroup
          title="Filters"
          filters={filters}
          onSelectItem={handleSelectItem}
          action={setSelectedFilters}
          selectedItems={selectedItems}
          isLargerScreen={isLargerScreen}
        />
        {!isLargerScreen && <Divider orientation="horizontal" />}
        <FilterGroup
          title="Food Type"
          filters={foodTypes}
          onSelectItem={handleSelectItem}
          action={setSelectedFoodItems}
          selectedItems={selectedItems}
          isLargerScreen={isLargerScreen}
        />
      </VStack>

      {loading && (
        <Center w="100%" h="4rem">
          <LoadingSpinner />
        </Center>
      )}

      {error && <Text>Failed to fetch meals.</Text>}

      {!loading && !error && <FoodCardList meals={filteredMeals} />}
    </Box>
  );
}

export default Homepage;
