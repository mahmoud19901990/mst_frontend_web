import { VStack, Box, Text, Button } from '@chakra-ui/react';

const Cart = ({ cartItems, removeFromCart }) => (
  <VStack spacing={4} p={6}>
    {cartItems.length === 0 ? (
      <Text>Your cart is empty</Text>
    ) : (
      cartItems.map((item) => (
        <Box key={item.id} p={4} borderWidth="1px" borderRadius="lg" w="100%">
          <Text fontSize="lg">{item.name}</Text>
          <Text color="gray.500">${item.price}</Text>
          <Button mt={2} colorScheme="red" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
        </Box>
      ))
    )}
  </VStack>
);

export default Cart;
