import { Box, Button, Text } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={6}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        mr={2}
        colorScheme="teal"
      >
        Previous
      </Button>
      <Text mx={2}>
        Page {currentPage + 1} of {totalPages}
      </Text>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 === totalPages}
        ml={2}
        colorScheme="teal"
      >
        Next
      </Button>
    </Box>
  );
};