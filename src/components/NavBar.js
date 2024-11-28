import React from 'react';
import { Box, Flex, Link, Spacer, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => (
  <Flex bg="teal.500" color="white" p={4} alignItems="center">
    {/* شعار المتجر */}
    <Box fontSize="xl" fontWeight="bold">My Store</Box>
    <Spacer />
    {/* الروابط العامة */}
    <Link as={RouterLink} to="/" p={2}>الصفحة الرئيسية</Link>
    {user && <Link as={RouterLink} to="/products" p={2}>المنتجات</Link>}
    {user && <Link as={RouterLink} to="/cart" p={2}>السلة</Link>}
    {user && (
      <Button as={RouterLink} to="/checkout" colorScheme="orange" size="sm" ml={2}>
        Checkout
      </Button>
    )}
    {user && (
      <Link as={RouterLink} to="/profile" p={2} ml={2}>
        الملف الشخصي
      </Link>
    )}
    <Spacer />
    {/* حالة تسجيل الدخول */}
    <Flex alignItems="center">
      {user ? (
        <>
          {/* عرض الترحيب باسم المستخدم */}
          <Text mr={4}>مرحبًا، {user.name}</Text>
          <Button colorScheme="red" size="sm" onClick={onLogout}>
            تسجيل الخروج
          </Button>
        </>
      ) : (
        <Button as={RouterLink} to="/login" colorScheme="blue" size="sm">
          تسجيل الدخول
        </Button>
      )}
    </Flex>
  </Flex>
);

export default NavBar;
