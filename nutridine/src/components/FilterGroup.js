import { useBreakpointValue, Stack, Text, Button, useColorMode, VStack, useColorModeValue } from "@chakra-ui/react";


const FilterGroup = ({ filters, onSelectItem, selectedItems }) => {
    const { colorMode } = useColorMode();
    const activeBg = useColorModeValue("light.primary.500", "dark.primary.600");
    const inactiveBg = useColorModeValue("gray.200", "gray.600")

    const stackDirection = useBreakpointValue({ base: 'row', md: 'row', lg: 'column' });

    return (
        <VStack
            align="start"
            borderRadius={15}
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
            >
                {filters.map((item) => (
                    <Button
                        key={item}
                        onClick={() => onSelectItem(item)}
                        bg={selectedItems.includes(item) ? activeBg : inactiveBg}
                        size="sm"
                        fontWeight="400"
                        _hover={{ bg: activeBg }}
                    >
                        {item}
                    </Button>
                ))}
            </Stack>
        </VStack >
    );
};

export default FilterGroup;
