import {
    Stack,
    Text,
    Button,
    useColorMode,
    VStack,
    useColorModeValue,
    Flex,
    Icon,
    Box,
    HStack,
} from "@chakra-ui/react";

const FilterGroup = ({
    title,
    filters,
    onSelectItem,
    action,
    selectedItems,
    isLargerScreen,
}) => {
    const { colorMode } = useColorMode();
    const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
    const inactiveBg = useColorModeValue("gray.200", "gray.600");
    const buttonBgHover = useColorModeValue(
        "light.primary.200",
        "dark.primary.400"
    );
    const paddingRight = isLargerScreen ? "20px" : "10px";

    return (
        <VStack
            bg={isLargerScreen && (colorMode === "dark" ? "gray.700" : "gray.50")}
            p={isLargerScreen ? 3 : 1}
            borderWidth={isLargerScreen ? 1 : 0}
            borderRadius={isLargerScreen ? 15 : 0}
            marginLeft={isLargerScreen ? -15 : 0}
            marginRight={paddingRight}
            spacing={isLargerScreen ? 3 : 1}
            alignItems={!isLargerScreen ? "start" : "stretch"}
            width="100%"
        >
            <Text
                fontSize="sm"
                color={colorMode === "dark" ? "gray.300" : "gray.500"}
            >
                {title}
            </Text>
            <Stack
                direction={isLargerScreen ? "column" : "row"}
                spacing="3"
                overflowX="auto"
                maxWidth="100%"
            >
                {filters.map((filter) => (
                    <Button
                        key={filter.name}
                        onClick={() => {
                            onSelectItem(filter.name);
                            action((prevItems) =>
                                prevItems.includes(filter.name)
                                    ? prevItems.filter((prevItem) => prevItem !== filter.name)
                                    : [...prevItems, filter.name]
                            );
                        }}
                        bg={selectedItems.includes(filter.name) ? activeBg : inactiveBg}
                        size="sm"
                        fontWeight="400"
                        _hover={{
                            bg: buttonBgHover,
                        }}
                        minW="max-content"
                    >
                        {filter.icon ?
                            <HStack justifyContent="space-between" alignItems="center" width="100%" spacing={0}>
                                {filter.icon && <Icon as={filter.icon} mr={2} />}
                                <Box as="span" textAlign="left">
                                    {filter.name}
                                </Box>
                            </HStack>
                            :
                            filter.name
                        }

                    </Button>
                ))}
            </Stack>
        </VStack>
    );
};

export default FilterGroup;
