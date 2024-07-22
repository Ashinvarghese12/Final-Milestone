import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getCategories } from '../api/categoryApi';
import { postImage } from '../api/imageApi';
import { createProducts, editProducts } from '../api/productApi';

const ProductModal = ({ open, handleClose, product, isEditing, onSave }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            const fetchCategories = async () => {
                const categoriesData = await getCategories();
                setCategories(categoriesData.data);
            };

            fetchCategories();

            if (isEditing && product) {
                setTitle(product.title);
                setPrice(product.price);
                setCategory(product.categoryId);
                setImage(product.images[0]);
            } else {
                setTitle('');
                setPrice('');
                setCategory('');
                setImage('');
                setDescription(''); // Reset description
            }
        }
    }, [open, isEditing, product]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                const response = await postImage(formData);
                setImage(response.data.location);
            } catch (err) {
                setError('Failed to upload image.');
            }
        }
    };

    const handleSave = async () => {
        setError('');
        const productData = {
            title,
            price,
            categoryId: category,
            images: [image]
        };

        if (!isEditing) {
            productData.description = description; // Include description only when adding
        }

        try {
            if (isEditing && product) {
                await editProducts(product.id, productData);
            } else {
                await createProducts(productData);
            }
            onSave();
        } catch (err) {
            setError('Failed to save product.');
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    select
                    margin="dense"
                    label="Category"
                    fullWidth
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </TextField>
                {!isEditing && (
                    <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {error && <p className="text-red-500">{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductModal;
