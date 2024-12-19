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
  useToast,
  Button,
} from '@chakra-ui/react';

const Products = () => {
  // تعريف حالات المكونات
  const [categories, setCategories] = useState([]); // لتخزين الفئات التي تم جلبها
  const [brands, setBrands] = useState([]); // لتخزين العلامات التجارية التي تم جلبها
  const [products, setProducts] = useState([]); // لتخزين المنتجات التي تم جلبها
  const [loading, setLoading] = useState(false); // حالة التحميل (هل البيانات قيد التحميل؟)
  const [selectedCategories, setSelectedCategories] = useState([]); // لتخزين الفئات التي يختارها المستخدم
  const [selectedBrands, setSelectedBrands] = useState([]); // لتخزين العلامات التجارية التي يختارها المستخدم
  const [searchTerm, setSearchTerm] = useState(''); // لتخزين مصطلح البحث الذي يدخله المستخدم
  const [cart, setCart] = useState([]); // لتخزين المنتجات المضافة إلى السلة
  const [currentPage, setCurrentPage] = useState(1); // الصفحة الحالية
  const [totalPages, setTotalPages] = useState(1); // إجمالي عدد الصفحات
  const toast = useToast(); // لاستخدام إشعارات Chakra UI

  const PAGE_SIZE = 5; // عدد المنتجات في كل صفحة

  // جلب الفئات من الـ API
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
        toast({
          title: 'Error',
          description: 'Failed to fetch categories.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchCategories();
  }, [toast]);

  // جلب العلامات التجارية من الـ API
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
        toast({
          title: 'Error',
          description: 'Failed to fetch brands.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchBrands();
  }, [toast]);

  // جلب المنتجات بناءً على الفلاتر (الفئات، العلامات التجارية، ومصطلح البحث)
  const fetchProducts = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const { categories = [], brands = [], search = '' } = filters;

      const categoryFilter = categories.length ? `&categories=${categories.join(',')}` : '';
      const brandFilter = brands.length ? `&brands=${brands.join(',')}` : '';
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
      toast({
        title: 'Error',
        description: 'Failed to fetch products.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // التعامل مع التغييرات في الفلاتر
  const handleFilterChange = () => {
    setCurrentPage(1); // إعادة تعيين الصفحة إلى 1 عند تغيير الفلاتر
    fetchProducts(1, {
      categories: selectedCategories, // تمرير الـ IDs
      brands: selectedBrands, // تمرير الـ IDs
      search: searchTerm,
    });
  };

  // إعادة جلب المنتجات عندما تتغير الفلاتر
  useEffect(() => {
    handleFilterChange();
  }, [selectedCategories, selectedBrands, searchTerm]);

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction={['column', 'row']}>
      {/* Sidebar (فئات وعلامات تجارية) */}
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

      {/* عرض المنتجات */}
      <Box flex="1" p={5}>
        <Input
          placeholder="Search for products..."
          mb={4}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Pagination */}
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
