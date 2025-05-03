// frontend/src/components/UrlList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUrls, updateUrl, deleteUrl } from '../redux/urlSlice';
import { BACKEND_API } from '../apiConfig';

const UrlList = () => {
    const { urls, loading, error } = useSelector((state) => state.urls);
    const dispatch = useDispatch();
    const [nameFilter, setNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    //useEffect to fetch URLs when the component mounts or filters change
    useEffect(() => {
        dispatch(fetchUrls({ name: nameFilter, date: dateFilter }));
    }, [nameFilter, dateFilter, dispatch]);

    // Function to handle copying the short URL to clipboard
    const handleCopy = (shortUrl) => {
        navigator.clipboard.writeText(shortUrl);
        alert('Copied to clipboard!');
    };

    // Function to handle updating a URL
    const handleUpdate = (id) => {
        const updatedData = {
            originalUrl: prompt('Enter the new original URL:'),
            expiresAt: prompt('Enter the new expiration date '),
        };

        if (updatedData.originalUrl && updatedData.expiresAt) {
            dispatch(updateUrl({ id, data: updatedData }));
        } else {
            alert('Update canceled. Both fields are required.');
        }
    };

    // Function to handle deleting a URL
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this URL?')) {
            dispatch(deleteUrl(id));
        }
    }

    //handle url click
    const handleUrlClick = (shortUrl) => {
        window.open(`${BACKEND_API}/urls/${shortUrl}`, '_blank');
        
    }

    const totalResults = urls.length;
    const startResult = totalResults > 0 ? 1 : 0;
    const endResult = totalResults;

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                    label="Search by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    size="small"
                    sx={{ flex: 1 }}
                />
                <TextField
                    label="Date Created"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    sx={{ flex: 1 }}
                />
            </Box>
            {/* {error && <Box color="error.main" sx={{ mb: 2 }}>{error}</Box>} */}
            {loading ? (
                <Box sx={{ textAlign: 'center' }}>Loading...</Box>
            ) : (
                <>
                    <TableContainer component={Paper} sx={{ mb: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Short URL</TableCell>
                                    <TableCell>Original URL</TableCell>
                                    <TableCell>Clicks</TableCell>
                                    <TableCell>Created Date</TableCell>
                                    <TableCell>Expiration</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {urls.map((url) => (
                                    <TableRow key={url.id}>
                                        <TableCell>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                onClick={() => handleUrlClick(url.shortUrl)}
                                            >
                                                {url.shortUrl}
                                            </Button>
                                        </TableCell>
                                        <TableCell>{url.originalUrl}</TableCell>
                                        <TableCell>{url.analytics?.clickCount || 0}</TableCell>
                                        <TableCell>{new Date(url.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(url.expiresAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleUpdate(url.id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(url.id)} color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="body2">
                            Showing {startResult} to {endResult} of {totalResults} results
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            <Button variant="outlined" disabled={startResult === 1}>
                                Previous
                            </Button>
                            <Button variant="outlined" disabled={endResult === totalResults}>
                                Next
                            </Button>
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default UrlList;