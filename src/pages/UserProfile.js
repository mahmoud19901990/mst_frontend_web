import React, { useState } from 'react';
import { Box, Input, Button, Stack, Heading, Text } from '@chakra-ui/react';

const UserProfile = ({ user, updateUser }) => {
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [cardNumber, setCardNumber] = useState(user?.cardNumber || '');
  const [expiryDate, setExpiryDate] = useState(user?.expiryDate || '');
  const [cvv, setCvv] = useState(user?.cvv || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // تحديث بيانات المستخدم
    updateUser({ email, address, cardNumber, expiryDate, cvv });
    alert('تم تحديث البيانات بنجاح!');
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading as="h2" size="lg" textAlign="center" mb={5}>
        الملف الشخصي
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Box>
            <Text mb={1}>البريد الإلكتروني:</Text>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box>
            <Text mb={1}>العنوان:</Text>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Box>
          <Box>
            <Text mb={1}>رقم البطاقة:</Text>
            <Input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </Box>
          <Box>
            <Text mb={1}>تاريخ انتهاء البطاقة:</Text>
            <Input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </Box>
          <Box>
            <Text mb={1}>رمز التحقق (CVV):</Text>
            <Input
              type="password"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" colorScheme="teal" width="full">
            حفظ التعديلات
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserProfile;
