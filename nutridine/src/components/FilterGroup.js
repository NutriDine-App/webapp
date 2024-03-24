import { useBreakpointValue, Stack, Text, Button, Box, useColorMode, VStack, useColorModeValue } from "@chakra-ui/react";


const FilterGroup = ({ filters, onSelectItem, selectedItems }) => {
    const { colorMode } = useColorMode();
    const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
    const inactiveBg = useColorModeValue("gray.200", "gray.600")

    const stackDirection = useBreakpointValue({ base: 'row', md: 'row', lg: 'column' });

    return (
        <VStack
            align="start"
            borderRadius={15}
        // borderWidth="1px"
        // py={3}
        // px={3}
        // bg={colorMode === "dark" ? "gray.700" : "gray.50"}
        >
            <Text
                fontSize="sm"
                color={colorMode === "dark" ? "gray.300" : "gray.500"}
            >
                Filters
            </Text>
            <Stack
                direction={stackDirection}
                spacing="3"
                overflowX="scroll"
            // width="100%"
            >
                {filters.map((item) => (
                    <Button
                        key={item}
                        onClick={() => onSelectItem(item)}
                        bg={selectedItems.includes(item) ? activeBg : inactiveBg}
                        size="sm"
                        fontWeight="400"
                    >
                        {item}
                    </Button>
                ))}
            </Stack>
        </VStack>
    );
};

export default FilterGroup;
