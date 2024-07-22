import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductCard from './ProductCard';
import PaginationRounded from '../src/components/Pagination'; // Import the pagination component
import { getProducts, editProducts, deleteProducts, findLimit } from '../src/api/productApi'; // Adjust the import path as needed

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
        const productsData = await getProducts(pagination);
        setProducts(productsData.data);
        const total = await findLimit(productsPerPage);
        setTotalProducts(total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, productsPerPage]);

  const handleEdit = async (id) => {
    // Implement edit functionality
    const productData = { /* new product data */ };
    await editProducts(id, productData);
    // Refresh the product list
    const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
    const productsData = await getProducts(pagination);
    setProducts(productsData.data);
  };

  const handleDelete = async (id) => {
    await deleteProducts(id);
    // Refresh the product list
    const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
    const productsData = await getProducts(pagination);
    setProducts(productsData.data);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TableContainer component={Paper} className=' px-20 pb-10 pt-5 '>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table" className='border shadow-2xl'>
          <TableHead>
            <TableRow >
              <TableCell >ID</TableCell>
              <TableCell >Image</TableCell>
              <TableCell >Name</TableCell>
              <TableCell >Category</TableCell>
              <TableCell >Price</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <div className='pb-6 pt-4 border-t-2 border-violet-300 sticky bottom-0 bg-white'>
      <PaginationRounded
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      </div>
    </>
  );
};

export default ProductList;
