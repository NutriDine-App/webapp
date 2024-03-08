import React from "react";
import data from "./ListData.json";
import { Box, Input, Grid, GridItem, Text } from "@chakra-ui/react";

function List(props) {
    const filteredData = data.filter((el) => {
      if (props.input === "") {
        return el;
      } else {
        return el.text.toLowerCase().includes(props.input);
      }
    });
  
    const calculateRowSpan = (index, length) => {
      if (index >= length * 0.6) {
        return 1;
      }
      const positionInPattern = index % 3;
      if (positionInPattern === 0 || positionInPattern === 2) {
        return 2;
      }
      return 1;
    };
  
    return (
      <Grid
        templateColumns="60% 40%"
        gap={4}
        autoRows="minmax(50px, auto)"
        w={"100%"}
      >
        {filteredData.map((item, index) => {
          const rowSpan = calculateRowSpan(index, filteredData.length);
          return (
            <GridItem
              key={item.id}
              bg="tomato"
              colSpan={index < filteredData.length * 0.6 ? 1 : 1}
              rowSpan={rowSpan}
            >
              <Text p={4}>{item.text}</Text>
            </GridItem>
          );
        })}
      </Grid>
    );
  }
  

function SearchBar() {
  const [inputText, setInputText] = React.useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <Box width={["100vw", "600px"]} p={5}>
      <h1>React Search</h1>
      <Input
        width="100%"
        border="1px"
        borderRadius={10}
        onChange={inputHandler}
        mb={5}
      />
      <List input={inputText} />
    </Box>
  );
}

export default SearchBar;
