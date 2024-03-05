import React, { useEffect } from "react";
import { Flex, useColorModeValue, Center } from "@chakra-ui/react";
import { MenuToggle } from "./MenuToggle";
import { MenuLinks } from "./MenuLinks";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("/");

  const toggle = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => () => {
    setActiveItem(item);
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

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
    </>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  const color = useColorModeValue("black", "white");
  return (
    <Center
      width="100%"
      height={"auto"}
      position="fixed"
      top={0}
      zIndex={2}
      bg={"transparent"}
      opacity={0.97}
      {...props}
    >
      <Flex
        as="nav"
        align="center"
        justify={["space-between", "center"]}
        wrap="wrap"
        width="100%"
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
