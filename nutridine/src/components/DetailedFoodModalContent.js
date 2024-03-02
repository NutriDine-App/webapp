import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export default function DetailedFoodModalContent({ meal, onClose }) {
  return (
    <>
      <ModalHeader>{meal ? meal.food_name : "Meal Name"}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {meal ? (
          // Display meal details
          <p>description...</p>
        ) : (
          // Display a loading message or placeholder content
          <p>Loading...</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Close
        </Button>
        {/* Add additional buttons or actions here */}
      </ModalFooter>
    </>
  );
}
