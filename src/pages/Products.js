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
  Spinner,
  Input,
  Button,
  Select,
  Image,
} from '@chakra-ui/react';
import { API_BASE_URL, STORE_SERIAL } from './config';

// استيراد الصورة الافتراضية من ملفات المشروع
import defaultImage from './images.jpg'; // استبدل هذا بالمسار الصحيح للصورة الافتراضية

const Products = ({ addToCart }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PAGE_SIZE = 5;

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/listofcategories/?storeSerial=${STORE_SERIAL}`
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

  // Fetch brands from the API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/listofbrands/?storeSerial=${STORE_SERIAL}`
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

  // Fetch products with optional filters
  const fetchProducts = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const { category = null, brand = null, search = '' } = filters;

      const categoryFilter = category ? `&categoryIds=${category}` : '';
      const brandFilter = brand ? `&brandIds=${brand}` : '';
      const searchFilter = search ? `&search=${search}` : '';

      const response = await fetch(
        `${API_BASE_URL}/listofitems/?storeSerial=${STORE_SERIAL}&page=${page}&size=${PAGE_SIZE}${categoryFilter}${brandFilter}${searchFilter}`
      );

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();

      // Fetch images for each product
      const productsWithImages = await Promise.all(
        data.content.map(async (product) => {
          if (product.imageFile) {
            const imageUrl = await fetchImage(product.imageFile);
            return { ...product, imageUrl };
          }
          // إذا لم يكن هناك صورة، استخدم الصورة الافتراضية
          return { ...product, imageUrl: defaultImage };
        })
      );

      setProducts(productsWithImages || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch image from the server
  const fetchImage = async (file) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getFileNoToken/?storeSerial=${STORE_SERIAL}&file=${file}`
      );
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // Handle filter changes
  const handleFilterChange = () => {
    setCurrentPage(1);
    fetchProducts(1, {
      category: selectedCategory,
      brand: selectedBrand,
      search: searchTerm,
    });
  };

  // Re-fetch products when filters change
  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedBrand, searchTerm]);

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(categorySearch.toLowerCase())
  );

  // Filter brands based on search term
  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(brandSearch.toLowerCase())
  );

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchTerm('');
    setCategorySearch('');
    setBrandSearch('');
  };

  return (
    <Flex direction={['column', 'row']}>
      {/* Sidebar for filters */}
      <Box w={['100%', '300px']} p={5} borderRight={['none', '1px solid #e0e0e0']}>
        <Heading as="h4" size="md" mb={4} color="teal.600">
          Categories
        </Heading>
        <Input
          placeholder="Search categories..."
          mb={2}
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />
        <Select
          placeholder="Select a category"
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </Select>

        <Heading as="h4" size="md" mt={6} mb={4} color="teal.600">
          Brands
        </Heading>
        <Input
          placeholder="Search brands..."
          mb={2}
          value={brandSearch}
          onChange={(e) => setBrandSearch(e.target.value)}
        />
        <Select
          placeholder="Select a brand"
          value={selectedBrand || ''}
          onChange={(e) => setSelectedBrand(e.target.value || null)}
        >
          {filteredBrands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.brandName}
            </option>
          ))}
        </Select>

        <Button mt={4} w="100%" colorScheme="teal" onClick={clearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Main content area */}
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
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      borderRadius="md"
                      
                      objectFit="cover"
                    />
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

        {/* Pagination controls */}
        <Flex justifyContent="center" mt={6}>
          <Button
            mr={3}
            onClick={() =>
              fetchProducts(currentPage - 1, {
                category: selectedCategory,
                brand: selectedBrand,
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
                category: selectedCategory,
                brand: selectedBrand,
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