import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // لحالة تقديم الطلب
  const [isLoggedIn, setIsLoggedIn] = useState(false); // لتتبع حالة تسجيل الدخول
  const toast = useToast();
  const navigate = useNavigate();

  // دالة لمعالجة تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // تحقق من أن البيانات تم تعبئتها
    if (!email || !password) {
      toast({
        title: 'خطأ!',
        description: 'يرجى إدخال كل الحقول.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true); // بدأ عملية تسجيل الدخول

    // محاكاة طلب تسجيل الدخول (مثال فقط)
    setTimeout(() => {
      // إذا كانت البيانات صحيحة (أو بعد التحقق من API أو قاعدة البيانات)
      const userData = { email }; // بيانات المستخدم بعد التسجيل
      onLogin(userData); // تحديث حالة المستخدم في الأب
      setIsLoggedIn(true); // تغيير حالة تسجيل الدخول
      setIsSubmitting(false); // إنهاء عملية التسجيل

      toast({
        title: 'تم تسجيل الدخول!',
        description: `مرحبًا بك، ${email}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // الانتقال إلى الصفحة الرئيسية أو أي صفحة أخرى بعد تسجيل الدخول
      navigate('/');
    }, 2000); // محاكاة طلب API مع تأخير لمدة 2 ثانية
  };

  if (isLoggedIn) {
    // إذا تم تسجيل الدخول بنجاح، يمكن أن نعرض رسالة أو إعادة التوجيه
    return (
      <Box>
        <Heading>تم تسجيل الدخول بنجاح!</Heading>
        <Text>مرحبًا بك في المتجر. سيتم إعادة توجيهك إلى الصفحة الرئيسية.</Text>
      </Box>
    );
  }

  return (
    <Box p={5} maxW="400px" mx="auto">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        تسجيل الدخول
      </Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel htmlFor="email">البريد الإلكتروني</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="password">كلمة المرور</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="full"
            size="lg"
            isDisabled={!email || !password}
          >
            تسجيل الدخول
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Login;
