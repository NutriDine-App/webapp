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
  AspectRatio,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import brandIds from "../../constants/brandIds";

function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    Object.keys(brandIds)
  );
  const [imageSrc, setImageSrc] = useState({});
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "gray.700");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const { colorMode } = useColorMode(); // This hook provides the current color mode
  const boxShadowHoverLight = "0 0 30px rgba(0, 0, 0, 0.3)";
  const boxShadowHoverDark = "0 0 30px rgba(255, 255, 255, 0.4)";

  useEffect(() => {
    const result = Object.keys(brandIds).filter((restaurant) =>
      restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(result);

    result.forEach((restaurant) => {
      import(`../../assets/RestaurantsLogos/${restaurant}.png`)
        .then((image) => {
          setImageSrc((prev) => ({ ...prev, [restaurant]: image.default }));
        })
        .catch((error) => {
          console.error(`Could not load image for ${restaurant}:`, error);
          setImageSrc((prev) => ({ ...prev, [restaurant]: undefined }));
        });
    });
  }, [searchTerm]);

  return (
    <VStack spacing={5} align="stretch">
      <Flex justify="center" w="full" p={4}>
        <Input
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={inputBg}
          p={4}
          size="lg" // You can create a custom size if 'lg' doesn't fit your needs
          rounded="md"
          shadow="base"
          w={{
            base: "400px",
            sm: "80%",
            md: "500px",
            lg: "600px",
            xl: "820px",
          }} // Set a fixed width for 'base' which is for mobile
          height="56px"
          fontSize="lg"
          focusBorderColor="blue.500" // Example color, set this to your preference
          sx={{
            "::placeholder": {
              fontSize: "lg",
            },
          }}
        />
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={5}
        px={{ md: 4 }}
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <Center key={brandIds[restaurant]} py={2}>
              <Box
                bg={cardBg}
                boxShadow={"xl"}
                _hover={{
                  boxShadow:
                    colorMode === "light"
                      ? boxShadowHoverLight
                      : boxShadowHoverDark,
                }}
                rounded="md"
                overflow="hidden"
                borderColor={borderColor}
                borderWidth="1px"
                cursor={"pointer"}
              >
                {imageSrc[restaurant] ? (
                  <AspectRatio ratio={1} w="250px">
                    <Image
                      src={imageSrc[restaurant]}
                      fit="contain"
                      alt={`${restaurant} logo`}
                      bg="white"
                    />
                  </AspectRatio>
                ) : (
                  <Box height="200px" w="full" bg="gray.200" />
                )}
                <Box p={6} height="100px">
                  <Text fontWeight={600} fontSize="lg" textAlign="center">
                    {restaurant}
                  </Text>
                </Box>
              </Box>
            </Center>
          ))
        ) : (
          <Flex
            Flex
            width={"100vw"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Center w="full" py={10}>
              {" "}
              <Text fontSize="2xl" color="gray.500">
                Sorry, the restaurant you're looking for is not available!!!
              </Text>
            </Center>
          </Flex>
        )}
      </SimpleGrid>
      sa
    </VStack>
  );
}

export default RestaurantsPage;
