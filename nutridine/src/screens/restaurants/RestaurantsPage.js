import React, { useState, useEffect, useMemo } from 'react'
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
  Flex
} from '@chakra-ui/react'
import brandIds from '../../constants/brandIds'
import useMealsByRestaurant from '../../hooks/Meals/useMealsByRestaurant'
import FoodCardList from "../../components/FoodDisplay/FoodCardList";

function RestaurantsPage () {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredRestaurants, setFilteredRestaurants] = useState(
    Object.keys(brandIds)
  )

  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedRestaurantMemo = useMemo(
    () => selectedRestaurant,
    [selectedRestaurant?.brandId, selectedRestaurant?.name]
  )

  const { meals, loading, error } = useMealsByRestaurant(selectedRestaurantMemo)

  const handleRestaurantClick = restaurant => {
    const newSelection = { brandId: brandIds[restaurant], name: restaurant }
    if (
      selectedRestaurant?.brandId !== newSelection.brandId ||
      selectedRestaurant?.name !== newSelection.name
    ) {
      setSelectedRestaurant(newSelection)
    }
  }

  const [imageSrc, setImageSrc] = useState({})
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const inputBg = useColorModeValue('white', 'gray.700')
  const cardBg = useColorModeValue('gray.50', 'gray.700')

  const { colorMode } = useColorMode()
  const boxShadowHoverLight = '0 0 30px rgba(0, 0, 0, 0.3)'
  const boxShadowHoverDark = '0 0 30px rgba(255, 255, 255, 0.4)'

  useEffect(() => {
    const result = Object.keys(brandIds).filter(restaurant =>
      restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRestaurants(result)

    result.forEach(restaurant => {
      import(`../../assets/RestaurantsLogos/${restaurant}.png`)
        .then(image => {
          setImageSrc(prev => ({ ...prev, [restaurant]: image.default }))
        })
        .catch(error => {
          console.error(`Could not load image for ${restaurant}:`, error)
          setImageSrc(prev => ({ ...prev, [restaurant]: undefined }))
        })
    })
  }, [searchTerm])
  if (loading) return <Center>Loading...</Center>
  if (error) return <Center>Error: {error.message}</Center>
  return (
    <VStack spacing={5} align='stretch'>
      <Flex justify='center' w='full' p={4}>
        <Input
          placeholder='Search restaurants...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          bg={inputBg}
          p={4}
          size='lg'
          rounded='md'
          shadow='base'
          w={{
            base: '400px',
            sm: '80%',
            md: '500px',
            lg: '600px',
            xl: '820px'
          }}
          height='56px'
          fontSize='lg'
          focusBorderColor='blue.500'
          sx={{
            '::placeholder': {
              fontSize: 'lg'
            }
          }}
        />
      </Flex>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={5}
        px={{ md: 4 }}
      >
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
            <Center key={brandIds[restaurant]} py={2}>
              <Box
                bg={cardBg}
                boxShadow={'xl'}
                _hover={{
                  boxShadow:
                    colorMode === 'light'
                      ? boxShadowHoverLight
                      : boxShadowHoverDark
                }}
                rounded='md'
                overflow='hidden'
                borderColor={borderColor}
                borderWidth='1px'
                cursor={'pointer'}
                onClick={() => handleRestaurantClick(restaurant)}
              >
                {imageSrc[restaurant] ? (
                  <AspectRatio ratio={1} w='250px'>
                    <Image
                      src={imageSrc[restaurant]}
                      fit='contain'
                      alt={`${restaurant} logo`}
                      bg='white'
                    />
                  </AspectRatio>
                ) : (
                  <Box height='200px' w='full' bg='gray.200' />
                )}
                <Box p={6} height='100px'>
                  <Text fontWeight={600} fontSize='lg' textAlign='center'>
                    {restaurant}
                  </Text>
                </Box>
              </Box>
            </Center>
          ))
        ) : (
          <Flex
            Flex
            width={'100vw'}
            alignContent={'center'}
            justifyContent={'center'}
          >
            <Center w='full' py={10}>
              {' '}
              <Text fontSize='2xl' p={3} color='gray.500'>
                Sorry, the restaurant you're looking for is not available!!!
              </Text>
            </Center>
          </Flex>
        )}
      </SimpleGrid>
      <FoodCardList meals={meals} />
    </VStack>
  )
}
export default RestaurantsPage;

// export default RestaurantsPage;
// import React, { useState, useEffect } from "react";
// import {
//   Input,
//   VStack,
//   Box,
//   useColorModeValue,
//   Image,
//   Text,
//   Center,
//   SimpleGrid,
//   AspectRatio,
//   useColorMode,
//   Flex,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
// } from "@chakra-ui/react";
// import brandIds from "../../constants/brandIds";
// import useMealsByRestaurant from "../../hooks/Meals/useMealsByRestaurant";
// import FoodCardList from "../../components/FoodDisplay/FoodCardList";

// function RestaurantsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredRestaurants, setFilteredRestaurants] = useState(
//     Object.keys(brandIds)
//   );
//   const [imageSrc, setImageSrc] = useState({});
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const borderColor = useColorModeValue("gray.200", "gray.600");
//   const inputBg = useColorModeValue("white", "gray.700");
//   const cardBg = useColorModeValue("gray.50", "gray.700");

//   const { colorMode } = useColorMode();
//   const boxShadowHoverLight = "0 0 30px rgba(0, 0, 0, 0.3)";
//   const boxShadowHoverDark = "0 0 30px rgba(255, 255, 255, 0.4)";

//   const { meals, loading, error } = useMealsByRestaurant(selectedRestaurant);

//   useEffect(() => {

//     const result = Object.keys(brandIds).filter((restaurant) =>
//       restaurant.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredRestaurants(result);

//     result.forEach((restaurant) => {
//       import(`../../assets/RestaurantsLogos/${restaurant}.png`)
//         .then((image) => {
//           setImageSrc((prev) => ({ ...prev, [restaurant]: image.default }));
//         })
//         .catch((error) => {
//           console.error(`Could not load image for ${restaurant}:`, error);
//           setImageSrc((prev) => ({ ...prev, [restaurant]: undefined }));
//         });
//     });
//   }, [searchTerm]);

//   const handleRestaurantClick = (restaurant) => {
//     setSelectedRestaurant({
//       brandId: brandIds[restaurant],
//       name: restaurant,
//     });
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedRestaurant(null);
//   };

//   return (
//     <VStack spacing={5} align="stretch">
//       {/* Search input and other UI components */}
//       {/* ... */}

//       {/* Modal for displaying meals */}
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="4xl">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>
//             {selectedRestaurant ? selectedRestaurant : "Restaurant Meals"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {loading ? (
//               <Center>Loading...</Center>
//             ) : error ? (
//               <Center>Error: {error.message}</Center>
//             ) : (
//               <FoodCardList meals={meals} />
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={handleCloseModal}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Restaurants Grid */}
//       <SimpleGrid
//         columns={{ base: 1, md: 2, lg: 3 }}
//         spacing={5}
//         px={{ md: 4 }}
//       >
//         {filteredRestaurants.length > 0 ? (
//           filteredRestaurants.map((restaurant) => (
//             <Center key={brandIds[restaurant]} py={2}>
//               <Box
//                 bg={cardBg}
//                 boxShadow={"xl"}
//                 _hover={{
//                   boxShadow:
//                     colorMode === "light"
//                       ? boxShadowHoverLight
//                       : boxShadowHoverDark,
//                 }}
//                 rounded="md"
//                 overflow="hidden"
//                 borderColor={borderColor}
//                 borderWidth="1px"
//                 cursor={"pointer"}
//                 onClick={() => handleRestaurantClick(restaurant)}
//               >
//               </Box>
//             </Center>
//           ))
//         ) : (
//           <Flex
//             width={"100vw"}
//             alignContent={"center"}
//             justifyContent={"center"}
//           >
//             <Center w="full" py={10}>
//               <Text fontSize="2xl" p={3} color="gray.500">
//                 Sorry, the restaurant you're looking for is not available!!!
//               </Text>
//             </Center>
//           </Flex>
//         )}
//       </SimpleGrid>
//     </VStack>
//   );
// }

// export default RestaurantsPage;
