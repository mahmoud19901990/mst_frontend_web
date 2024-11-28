import React from 'react';
import { Box, Button, Heading, Text, Stack, FormControl, FormLabel, Input, Divider } from '@chakra-ui/react';

const Checkout = ({ cartItems, totalPrice }) => {
  // معالجة عملية الدفع (على سبيل المثال، هذه مجرد محاكاة للطلب)
  const handleCheckout = () => {
    alert('تمت عملية الشراء بنجاح!');
    // هنا يمكنك إضافة لوجيك حقيقي للتفاعل مع API أو الدفع الإلكتروني
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={6}>
        إتمام الطلب
      </Heading>

      {/* تفاصيل الدفع */}
      <Heading size="md" mb={4}>
        تفاصيل الدفع
      </Heading>
      <Stack spacing={4} mb={6}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">الاسم الكامل</FormLabel>
          <Input id="name" placeholder="أدخل اسمك" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="address">العنوان</FormLabel>
          <Input id="address" placeholder="أدخل عنوانك" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="paymentMethod">طريقة الدفع</FormLabel>
          <Input id="paymentMethod" placeholder="أدخل طريقة الدفع (بطاقة ائتمان، PayPal، إلخ)" />
        </FormControl>
      </Stack>

      <Divider mb={6} />

      {/* السعر الكلي */}
      <Box mb={6} textAlign="right">
        <Text fontSize="xl" fontWeight="bold">
          المبلغ الكلي: ${totalPrice}
        </Text>
      </Box>

      {/* زر إتمام الدفع */}
      <Button colorScheme="teal" size="lg" onClick={handleCheckout} width="100%">
        إتمام الشراء
      </Button>
    </Box>
  );
};

export default Checkout;
