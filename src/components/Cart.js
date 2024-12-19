import React from 'react';
import { 
  Button, 
  Box, 
  Text, 
  SimpleGrid, 
  Card, 
  CardBody, 
  Stack, 
  Heading, 
  IconButton, 
  useToast 
} from "@chakra-ui/react";
import { BsCartX } from "react-icons/bs"; // أيقونة الحذف

const Cart = ({ cartItems, removeFromCart }) => {
  const toast = useToast();

  // حساب السعر الكلي لجميع العناصر في السلة
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  // تأكيد حذف المنتج
  const handleRemove = (serial, name) => {
    const confirmDelete = window.confirm(`هل أنت متأكد أنك تريد حذف المنتج: ${name}؟`);
    if (confirmDelete) {
      removeFromCart(serial);
      toast({
        title: "تم الحذف",
        description: `تمت إزالة ${name} من السلة.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">
        🛒 سلة المشتريات
      </Heading>

      {cartItems.length === 0 ? (
        <Text fontSize="lg" color="gray.500" textAlign="center">
          السلة فارغة حاليًا. أضف بعض المنتجات!
        </Text>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
            {cartItems.map(item => (
              <Card 
                key={item.serial} 
                boxShadow="lg" 
                borderRadius="lg" 
                overflow="hidden"
                _hover={{ boxShadow: "2xl" }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading size="md" color="teal.700">{item.name}</Heading>
                    <Text color="gray.600">رقم المنتج: {item.serial}</Text>
                    <Text fontSize="lg" fontWeight="bold" color="teal.500">
                      السعر: ${item.price.toFixed(2)}
                    </Text>
                    {/* زر حذف المنتج */}
                    <IconButton
                      colorScheme="red"
                      aria-label="Remove from cart"
                      icon={<BsCartX />}
                      onClick={() => handleRemove(item.serial, item.name)}
                    />
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* عرض السعر الكلي */}
          <Box mt={6} textAlign="right" p={3} borderTop="1px solid #e0e0e0">
            <Text fontSize="xl" fontWeight="bold" color="teal.700">
              السعر الكلي: ${totalPrice}
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
