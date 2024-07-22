import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductCard from './ProductCard';
import PaginationRounded from './Pagination'; 
import { getProducts, deleteProducts, findLimit } from '../api/productApi';
import ProductModal from './Modal';

const ProductList = ({ refresh, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);  //set product per page here
    const [totalProducts, setTotalProducts] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
                const productsData = await getProducts(pagination, searchQuery);
                setProducts(productsData.data);
                const total = await findLimit(productsPerPage, searchQuery);
                setTotalProducts(total);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, productsPerPage, refresh, searchQuery]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        await deleteProducts(id);
        const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
        const productsData = await getProducts(pagination);
        setProducts(productsData.data);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSave = () => {
        const pagination = { offset: (currentPage - 1) * productsPerPage, limit: productsPerPage };
        getProducts(pagination).then(productsData => {
            setProducts(productsData.data);
        });
        setModalOpen(false);
        setIsEditing(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '84vh'}} className='pb-2 pt-3 px-20 '>
                <TableContainer sx={{ maxHeight: 715 ,borderRadius: '32px'  }}  className='border shadow-2xl'>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }} align="right">Price</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'serif' }} align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onEdit={() => handleEdit(product)} 
                                    onDelete={() => handleDelete(product.id)} 
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <div className='pt-5 border-t-2 border-violet-500 bg-white '>
                <PaginationRounded
                    totalPages={Math.ceil(totalProducts / productsPerPage)} //number of page calculation is done here
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            </div>
            <ProductModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                product={selectedProduct}
                isEditing={isEditing}
                onSave={handleSave}
            />
        </>
    );
};

export default ProductList;

