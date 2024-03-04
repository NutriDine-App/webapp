import React, { useEffect } from "react";
import { Box, Flex, useColorModeValue, Center } from "@chakra-ui/react";
import { MenuToggle } from "./MenuToggle";
import { MenuLinks } from "./MenuLinks";

const PageContainer = ({ children }) => (
  <Box mt="60px" p={4}>
    {children}
  </Box>
);

const HomePage = () => <PageContainer>Home Page Content</PageContainer>;

const RestaurantsPage = () => (
  <PageContainer>Restaurants Page Content</PageContainer>
);

const MacroPage = () => <PageContainer>Macro Page Content</PageContainer>;

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/");

  const toggle = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => () => {
    setActiveItem(item);
    setIsOpen(false);
  };

  const renderContent = () => {
    switch (activeItem) {
      case "/":
        return <HomePage />;
      case "/restaurants":
        return <RestaurantsPage />;
      case "/macro":
        return <MacroPage />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    // Disable body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    // Optional: Clean up function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <NavBarContainer {...props}>
        <Flex
          align="center"
          justify={["space-between", "center"]}
          width="100%"
          maxWidth="960px"
        >
          <MenuToggle toggle={toggle} isOpen={isOpen} />
          <MenuLinks
            isOpen={isOpen}
            onItemSelect={handleItemClick}
            activeItem={activeItem}
          />
        </Flex>
      </NavBarContainer>
      {renderContent()}
    </>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  const color = useColorModeValue("black", "white");
  return (
    <Center
      p={4}
      width="100%"
      position="fixed"
      top={0}
      zIndex={2}
      bg={"transparent"}
      {...props}
    >
      <Flex
        as="nav"
        align="center"
        justify={["space-between", "center"]}
        wrap="wrap"
        width="100%"
        mb={8}
        p={8}
        borderRadius={25}
        color={color}
        fontFamily={"navbar"}
        fontSize={["sm", "md", "lg"]}
      >
        {children}
      </Flex>
    </Center>
  );
};

export default NavBar;
