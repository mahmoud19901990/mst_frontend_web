import React from 'react';
import { Button, Box, Text, SimpleGrid, Card, CardBody, Stack, Heading, IconButton } from "@chakra-ui/react";
import { BsCartX } from "react-icons/bs"; // أيقونة الحذف

const Cart = ({ cartItems, removeFromCart }) => {
  // حساب السعر الكلي لجميع العناصر في السلة
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={6}>
        سلة المشتريات
      </Heading>

      {cartItems.length === 0 ? (
        <Text>السلة فارغة</Text> // إذا كانت السلة فارغة، نعرض هذه الرسالة
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {cartItems.map(item => (
            <Card key={item.serial} boxShadow="md" borderRadius="lg" overflow="hidden">
              <CardBody>
                <Stack spacing={3}>
                  <Heading size="md">{item.name}</Heading> {/* اسم المنتج */}
                  <Text color="gray.600">Serial: {item.serial}</Text> {/* الرقم التسلسلي */}
                  <Text fontSize="lg" fontWeight="bold">
                    Price: ${item.price} {/* سعر المنتج */}
                  </Text>
                  
                  {/* زر حذف المنتج */}
                  <IconButton
                    colorScheme="red"
                    aria-label="Remove from cart"
                    icon={<BsCartX />}
                    onClick={() => removeFromCart(item.serial)} // عند الضغط على الزر، يتم حذف المنتج
                  />
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}

      {/* عرض السعر الكلي */}
      <Box mt={6} textAlign="right">
        <Text fontSize="xl" fontWeight="bold">السعر الكلي: ${totalPrice}</Text> {/* حساب السعر الكلي */}
      </Box>
    </Box>
  );
};

export default Cart;
