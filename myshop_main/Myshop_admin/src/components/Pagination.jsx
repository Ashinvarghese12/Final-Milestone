import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationRounded = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <Stack alignItems='center' fixed>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => handlePageChange(value)}
        variant="outlined"
        shape="rounded-md"
        color='secondary'
      />
    </Stack>
  );
};

export default PaginationRounded;
