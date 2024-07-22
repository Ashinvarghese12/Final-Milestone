import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <TableRow key={product.id}>
      <TableCell>{product.id}</TableCell>
      <TableCell>
        <img src={product.images[0]} alt={product.title} style={{ height: '50px', width: '50px' }} />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell>{product.category?.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <IconButton color="primary" aria-label="edit" onClick={() => onEdit(product.id)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="delete" onClick={() => onDelete(product.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductCard;
