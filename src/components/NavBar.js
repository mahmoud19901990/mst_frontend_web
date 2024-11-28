
import { Box, Flex, Link, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => (
  <Flex bg="teal.500" color="white" p={4}>
    <Box fontSize="xl" fontWeight="bold">My Store</Box>
    <Spacer />
    <Link as={RouterLink} to="/" p={2}>الصفحة الرئيسية</Link>
    <Link as={RouterLink} to="/products" p={2}>المنتجات</Link>
    <Link as={RouterLink} to="/cart" p={2}>السلة</Link>
    <Button as={RouterLink} to="/checkout" colorScheme="orange" size="sm">Checkout</Button>
  </Flex>
);

export default NavBar;
