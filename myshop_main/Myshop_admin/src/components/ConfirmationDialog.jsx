import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <div className='flex gap-6'>
                    <button onClick={onClose} className='text-black bg-gray-100 px-6 py-2 rounded-md hover:bg-gray-200 '>
                        No
                    </button>
                    <button onClick={onConfirm} className='text-white bg-red-500 px-6 py-2 rounded-md hover:bg-red-600' >
                        Yes
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
