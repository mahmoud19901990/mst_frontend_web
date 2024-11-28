import { Box, Text, Button } from '@chakra-ui/react';

const Checkout = () => (
  <Box textAlign="center" p={8}>
    <Text fontSize="2xl" mb={4}>Checkout</Text>
    <Text>Thank you for shopping with us!</Text>
    <Button mt={4} colorScheme="teal">Return to Home</Button>
  </Box>
);

export default Checkout;