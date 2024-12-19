import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, useToast, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // لتحديد إذا كنا في وضع التسجيل
  const [users, setUsers] = useState([]); // تخزين المستخدمين محليًا
  const toast = useToast();
  const navigate = useNavigate();

  // تبديل بين تسجيل الدخول والتسجيل
  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
  };

  // دالة التسجيل
  const handleRegister = (e) => {
    e.preventDefault();

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

    // التحقق إذا كان المستخدم مسجل مسبقًا
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      toast({
        title: 'خطأ!',
        description: 'البريد الإلكتروني مسجل مسبقًا.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // إضافة المستخدم إلى القائمة محليًا
    setUsers([...users, { email, password }]);
    toast({
      title: 'تم التسجيل بنجاح!',
      description: 'يمكنك الآن تسجيل الدخول باستخدام بياناتك.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setIsRegistering(false);
  };

  // دالة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();

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

    setIsSubmitting(true);

    // التحقق من بيانات المستخدم محليًا
    const user = users.find((u) => u.email === email && u.password === password);
    setTimeout(() => {
      if (user) {
        onLogin(user);
        toast({
          title: 'تم تسجيل الدخول!',
          description: `مرحبًا بك، ${email}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/');
      } else {
        toast({
          title: 'خطأ!',
          description: 'بيانات تسجيل الدخول غير صحيحة.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Box p={5} maxW="400px" mx="auto">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        {isRegistering ? 'إنشاء حساب' : 'تسجيل الدخول'}
      </Heading>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
            {isRegistering ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </Button>
        </VStack>
      </form>
      <HStack justifyContent="center" mt={4}>
        <Text>{isRegistering ? 'لديك حساب بالفعل؟' : 'لا تملك حسابًا؟'}</Text>
        <Button variant="link" colorScheme="blue" onClick={handleToggle}>
          {isRegistering ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </Button>
      </HStack>
    </Box>
  );
}

export default Login;
