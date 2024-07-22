import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const cleanUrlString = (url) => {
    return url.replace(/^\[\"|\"\]$/g, "");
  };
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={product.id}>
      <TableCell sx={{fontSize: '1.11rem', fontFamily: 'serif' }}>{product.id}</TableCell>
      <TableCell>
        <img src={cleanUrlString(product.images[0])} alt={product.title} style={{ height: '50px', width: '50px', borderRadius:'20px' }} />
      </TableCell>
      <TableCell sx={{fontSize: '1.11rem', fontFamily: 'serif' }}>{product.title}</TableCell>
      <TableCell sx={{fontSize: '1.11rem', fontFamily: 'serif' }}>{product.category?.name}</TableCell>
      <TableCell sx={{fontSize: '1.11rem', fontFamily: 'serif' }} align="right">{product.price}</TableCell>
      <TableCell align="right">
        <IconButton color="primary" aria-label="edit" onClick={() => onEdit(product.id)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete" onClick={() => onDelete(product.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductCard;
