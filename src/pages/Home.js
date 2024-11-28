import React from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Center, VStack, useBreakpointValue, Container } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// استيراد المنتجات من صفحة المنتجات
const products = [
  { id: 1, name: 'لوحة أم', price: 100, image: 'motherboard.jpg', serial: 'abc123' },
  { id: 2, name: 'معالج', price: 150, image: 'processor.jpg', serial: 'def456' },
  { id: 3, name: 'ذواكر RAM', price: 75, image: 'ram.jpg', serial: 'ghi789' },
  { id: 4, name: 'مزود طاقة', price: 120, image: 'psu.jpg', serial: 'jkl012' },
  { id: 5, name: 'كرت شاشة', price: 400, image: 'gpu.jpg', serial: 'mno345' },
];

function Home({ addToCart }) {
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg' });

  // اختيار ثلاث منتجات من صفحة المنتجات
  const featuredProducts = products.slice(0, 3); // المنتجات من 1 إلى 3

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={5}>
      {/* قسم الترحيب */}
      <Center>
        <VStack spacing={5} textAlign="center" maxW="1200px">
          <Heading 
            as="h1" 
            size={headingSize} 
            fontWeight="bold" 
            letterSpacing="wider"
            textTransform="uppercase"
            lineHeight="1.2"
            textShadow="0 0 10px rgba(0, 255, 255, 0.5)"
          >
            مرحبًا بك في متجر الإلكترونيات الرائد
          </Heading>
          <Text fontSize={textSize} color="gray.300" maxW="xl">
            استكشف أحدث الأجهزة والمنتجات التقنية لدينا! من الكمبيوترات الشخصية إلى الهواتف الذكية، لدينا كل ما تحتاجه.
          </Text>
          <Button 
            as={RouterLink} 
            to="/products" 
            colorScheme="teal" 
            size="lg" 
            variant="solid" 
            width="fit-content"
            borderRadius="md"
            _hover={{ bg: 'teal.600' }}
            transition="all 0.3s ease"
          >
            استعرض المنتجات
          </Button>
        </VStack>
      </Center>

      {/* قسم المنتجات المميزة */}
      <Container maxW="1200px" mt={20}>
        <Heading as="h2" size="lg" textAlign="center" mb={10} letterSpacing="wider">
          منتجاتنا المميزة
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {featuredProducts.map((product) => (
            <Box 
              key={product.id}
              boxShadow="lg" 
              borderRadius="lg" 
              bg="whiteAlpha.200"
              p={5}
              transition="transform 0.3s ease"
              _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
            >
              <Heading size="md" color="white" textAlign="center">{product.name}</Heading>
              <Text color="gray.400" mt={2} textAlign="center">${product.price}</Text>
              <Button 
                colorScheme="teal" 
                variant="solid" 
                mt={3} 
                width="full"
                borderRadius="md"
                _hover={{ bg: 'teal.600' }}
                onClick={() => addToCart(product)}  // إضافة المنتج إلى السلة
              >
                أضف إلى السلة
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* قسم عن المتجر */}
      <Box mt={20} bg="teal.500" color="white" p={10} borderRadius="md" textAlign="center">
        <VStack spacing={5}>
          <Heading as="h3" size="lg" fontWeight="bold" textTransform="uppercase">
            لماذا تختار متجرنا؟
          </Heading>
          <Text fontSize="lg" color="gray.200" maxW="700px">
            نحن نقدم لك أفضل المنتجات الإلكترونية من الماركات الرائدة مع ضمان الجودة والأسعار التنافسية. اكتشف كل ما هو جديد في عالم التكنولوجيا.
          </Text>
          <Button 
            as={RouterLink} 
            to="/products" 
            colorScheme="teal" 
            size="lg" 
            variant="solid" 
            width="fit-content"
            borderRadius="md"
            _hover={{ bg: 'teal.600' }}
            transition="all 0.3s ease"
          >
            ابدأ التسوق الآن
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Home;
