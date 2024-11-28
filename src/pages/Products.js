import React, { useEffect, useState } from 'react';
import { Button } from "@chakra-ui/react";
import { BsCart2 } from "react-icons/bs";
import { Box, Text, SimpleGrid, Card, CardBody, Heading, Stack, Spinner, Flex, HStack } from '@chakra-ui/react';

const Products = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total pages

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://localhost:8443/listofitems/?storeSerial=AW6KY5NU5GTAV7D8EL03Y26QGPBDE0UH&page=${page}&size=10`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
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
  }, [page]); // Refetch data when the page changes

  if (loading)
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );

  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={6}>
        Item List
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {items.map(item => (
          <Card key={item.serial} boxShadow="md" borderRadius="lg" overflow="hidden">
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md">{item.name}</Heading>
                <Text color="gray.600">Serial: {item.serial}</Text>
                <Text fontSize="lg" fontWeight="bold">
                  Price: ${item.price}
                </Text>
                <Button mt={4} colorScheme="teal" onClick={() => addToCart(item)}>
                  <BsCart2 /> إضافة الى السلة
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {/* Pagination Controls */}
      <HStack justifyContent="center" mt={6}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          colorScheme="teal"
        >
          Previous
        </Button>
        <Text>
          Page {page + 1} of {totalPages}
        </Text>
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          colorScheme="teal"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
};

export default Products;
