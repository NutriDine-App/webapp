import { useBreakpointValue, Stack, Text, Button, useColorMode, VStack, useColorModeValue } from "@chakra-ui/react";


const FilterGroup = ({ title, filters, onSelectItem, action, selectedItems, isLargerScreen }) => {
    const { colorMode } = useColorMode();
    const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
    const inactiveBg = useColorModeValue("gray.200", "gray.600")

    return (
        <VStack
            bg={isLargerScreen && (colorMode === "dark" ? "gray.700" : "gray.50")}
            p={isLargerScreen && 3}
            borderWidth={isLargerScreen && 1}
            borderRadius={isLargerScreen && 15}
            marginLeft={isLargerScreen && (-15)}
            spacing={isLargerScreen ? 3 : 1}
            alignItems={!isLargerScreen && 'start'}
        >
            <Text
                fontSize="sm"
                color={colorMode === "dark" ? "gray.300" : "gray.500"}
            >
                {title}
            </Text>
            <Stack
                direction={isLargerScreen ? 'column' : 'row'}
                spacing="3"
                overflowX="auto"
                maxWidth="100%"
            >
                {filters.map((item) => (
                    <Button
                        key={item}
                        onClick={() => {
                            onSelectItem(item);
                            action((prevItems) => prevItems.includes(item) ?
                                prevItems.filter((prevItem) => prevItem !== item) :
                                [...prevItems, item]);
                        }}
                        bg={selectedItems.includes(item) ? activeBg : inactiveBg}
                        size="sm"
                        fontWeight="400"
                        _hover={{ bg: activeBg }}
                        minWidth="max-content"
                    >
                        {item}
                    </Button>
                ))}
            </Stack>
        </VStack >
    );
};

export default FilterGroup;
