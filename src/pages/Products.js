import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Stack,
  Flex,
  Checkbox,
  CheckboxGroup,
  VStack,
  Spinner,
  Input,
  Button,
} from '@chakra-ui/react';

const Products = ({ addToCart }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://mahmoud1990.ddns.net:8443/listofcategories/?storeSerial=AW6KY5NU5GTAV7D8EL03Y26QGPBDE0UH'
        );
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          'https://mahmoud1990.ddns.net:8443/listofbrands/?storeSerial=AW6KY5NU5GTAV7D8EL03Y26QGPBDE0UH'
        );
        if (!response.ok) throw new Error('Failed to fetch brands');
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrands();
  }, []);

  const fetchProducts = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const { categories = [], brands = [], search = '' } = filters;

      const categoryFilter = categories.length ? `&categoryIds=${categories.join(',')}` : '';
      const brandFilter = brands.length ? `&brandIds=${brands.join(',')}` : '';
      const searchFilter = search ? `&search=${search}` : '';

      const response = await fetch(
        `https://mahmoud1990.ddns.net:8443/listofitems/?storeSerial=AW6KY5NU5GTAV7D8EL03Y26QGPBDE0UH&page=${page}&size=${PAGE_SIZE}${categoryFilter}${brandFilter}${searchFilter}`
      );

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchProducts(1, {
      categories: selectedCategories,
      brands: selectedBrands,
      search: searchTerm,
    });
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategories, selectedBrands, searchTerm]);

  return (
    <Flex direction={['column', 'row']}>
      <Box w={['100%', '300px']} p={5} borderRight={['none', '1px solid #e0e0e0']}>
        <Heading as="h4" size="md" mb={4} color="teal.600">
          Categories
        </Heading>
        <CheckboxGroup
          value={selectedCategories}
          onChange={(value) => setSelectedCategories(value)}
        >
          <VStack align="start">
            {categories.map((category) => (
              <Checkbox key={category.id} value={category.id}>
                {category.categoryName}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>

        <Heading as="h4" size="md" mt={6} mb={4} color="teal.600">
          Brands
        </Heading>
        <CheckboxGroup
          value={selectedBrands}
          onChange={(value) => setSelectedBrands(value)}
        >
          <VStack align="start">
            {brands.map((brand) => (
              <Checkbox key={brand.id} value={brand.id}>
                {brand.brandName}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </Box>

      <Box flex="1" p={5}>
        <Input
          placeholder="Search for products..."
          mb={4}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        {loading ? (
          <Flex justifyContent="center" alignItems="center" minH="50vh">
            <Spinner size="xl" color="teal.500" />
          </Flex>
        ) : products.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            {products.map((product) => (
              <Card key={product.id} borderWidth="1px" borderRadius="lg">
                <CardBody>
                  <Stack spacing={3}>
                    <Heading size="md" color="teal.500">
                      {product.name}
                    </Heading>
                    <Text>{product.description}</Text>
                    <Text fontWeight="bold" color="teal.600">
                      Price: ${product.price}
                    </Text>
                    <Button colorScheme="teal" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500" textAlign="center" mt={10}>
            No products match the current filters.
          </Text>
        )}

        <Flex justifyContent="center" mt={6}>
          <Button
            mr={3}
            onClick={() =>
              fetchProducts(currentPage - 1, {
                categories: selectedCategories,
                brands: selectedBrands,
                search: searchTerm,
              })
            }
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text alignSelf="center">
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            ml={3}
            onClick={() =>
              fetchProducts(currentPage + 1, {
                categories: selectedCategories,
                brands: selectedBrands,
                search: searchTerm,
              })
            }
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Products;
