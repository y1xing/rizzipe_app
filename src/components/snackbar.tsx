"use client";

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface Props {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity?: "error" | "success" | "info" | "warning";
}

export default function SnackBar(props: Props) {
    const { open, handleClose, message, severity } = props;

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}