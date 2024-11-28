import React, { useEffect, useState } from 'react';
import { Box, Button, Text, SimpleGrid, Card, CardBody, Heading, Stack, Spinner, Flex, HStack, Divider } from '@chakra-ui/react';
import { BsCart2 } from "react-icons/bs";

const Products = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://mahmoud1990.ddns.net:8443/listofitems/?storeSerial=AW6KY5NU5GTAV7D8EL03Y26QGPBDE0UH&page=${page}&size=10`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setItems(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  // Handle Pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );

  if (error)
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Text color="red.500" fontSize="lg" fontWeight="bold">
          حدث خطأ: {error.message}
        </Text>
      </Flex>
    );

  return (
    <Box p={5} maxW="1200px" mx="auto">
      <Heading as="h2" size="xl" mb={8} textAlign="center" color="teal.600">
        قائمة المنتجات
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {items.map((item) => (
          <Card
            key={item.serial}
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ transform: "scale(1.05)", transition: "0.3s ease-in-out" }}
          >
            <CardBody>
              <Stack spacing={4}>
                <Heading size="md" textAlign="center">
                  {item.name}
                </Heading>
                <Text color="gray.600" textAlign="center">
                  Serial: {item.serial}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="teal.500" textAlign="center">
                  ${item.price}
                </Text>
                <Divider />
                <Button
                  mt={4}
                  colorScheme="teal"
                  variant="solid"
                  size="md"
                  onClick={() => addToCart(item)}
                  leftIcon={<BsCart2 />}
                >
                  أضف إلى السلة
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Pagination Controls */}
      <HStack justifyContent="center" mt={8}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          colorScheme="teal"
          variant="outline"
        >
          السابق
        </Button>

        <Text fontSize="lg" fontWeight="bold">
          الصفحة {page + 1} من {totalPages}
        </Text>

        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          colorScheme="teal"
          variant="outline"
        >
          التالي
        </Button>
      </HStack>
    </Box>
  );
};

export default Products;
