import React, { useState, useEffect } from "react";
import {
  Input,
  VStack,
  Box,
  useColorModeValue,
  Image,
  Text,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import brandIds from "../../constants/brandIds";

function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    Object.keys(brandIds)
  );
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    const result = Object.keys(brandIds).filter((restaurant) =>
      restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(result);
  }, [searchTerm]);

  const getLogoPath = (restaurant) => {
    // try {
    const formattedName = restaurant.replace(/[^a-zA-Z0-9]/g, "");
    console.log(formattedName);
    return `../../assets/RestaurantsLogos/${formattedName}.png`;
    // } catch (e) {
    //   console.warn(`Logo for ${restaurant} not found.`);
    //   return null;
    // }
  };

  return (
    <VStack spacing={5} align="stretch">
      <Box bg={inputBg} p={4} rounded="md" shadow="base">
        <Input
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {filteredRestaurants.map((restaurant) => (
          <Center key={brandIds[restaurant]} py={2}>
            <Box
              maxW={"445px"}
              w={"full"}
              bg={cardBg}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              borderColor={borderColor}
              borderWidth="1px"
            >
              <Image
                h={"150px"}
                w={"full"}
                src={require(`../../assets/RestaurantsLogos/${restaurant}.png`)}
                objectFit={"cover"}
                alt={`${restaurant} logo`}
                bg={"white"}
              />

              <Box p={6}>
                <Text fontWeight={600} fontSize={"lg"}>
                  {restaurant}
                </Text>
                {/* Additional restaurant info if needed */}
              </Box>
            </Box>
          </Center>
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default RestaurantsPage;
