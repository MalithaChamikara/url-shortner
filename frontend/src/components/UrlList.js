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
    Tooltip,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme, useMediaQuery } from '@mui/material';
import { fetchUrls, updateUrl, deleteUrl } from '../redux/urlSlice';
import { BACKEND_API } from '../apiConfig';

const UrlList = () => {
    const { urls, loading, error } = useSelector((state) => state.urls);
    const dispatch = useDispatch();
    const [nameFilter, setNameFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    // use theme and media query for responsive design
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    //useEffect to fetch URLs when the component mounts or filters change
    useEffect(() => {
        dispatch(fetchUrls({ name: nameFilter, date: dateFilter }));
    }, [nameFilter, dateFilter, dispatch]);

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
        //refresh the list after clicking the URL
        dispatch(fetchUrls({ name: nameFilter, date: dateFilter }));
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
                    {isMobile ? (
                        <Grid container spacing={2}>
                            {urls.map((url) => (
                                <Grid item xs={12} sm={6} md={4} key={url.id}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            {url.isActive ? (
                                                <Button
                                                    variant="text"
                                                    color="primary"
                                                    onClick={() => handleUrlClick(url.shortUrl)}
                                                >
                                                    {url.shortUrl}
                                                </Button>
                                            ) : (
                                                <Tooltip title="This URL is disabled" arrow>
                                                    <span>
                                                        <Button
                                                            variant="text"
                                                            color="primary"
                                                            disabled
                                                            sx={{ cursor: 'not-allowed' }}
                                                        >
                                                            {url.shortUrl}
                                                        </Button>
                                                    </span>
                                                </Tooltip>
                                            )}
                                            <Typography variant="h6">{url.shortUrl}</Typography>
                                            <Typography variant="body2">{url.originalUrl}</Typography>
                                            <Typography variant="body2">Clicks: {url.analytics?.clickCount || 0}</Typography>
                                            <Typography variant="body2">Created: {new Date(url.createdAt).toLocaleDateString()}</Typography>
                                            <Typography variant="body2">Expires: {new Date(url.expiresAt).toLocaleDateString()}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'space-between' }}>
                                            <IconButton onClick={() => handleUpdate(url.id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(url.id)} color="secondary">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
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
                                                {url.isActive ? (
                                                    <Button
                                                        variant="text"
                                                        color="primary"
                                                        onClick={() => handleUrlClick(url.shortUrl)}
                                                    >
                                                        {url.shortUrl}
                                                    </Button>
                                                ) : (
                                                    <Tooltip title="This URL is disabled" arrow>
                                                        <span>
                                                            <Button
                                                                variant="text"
                                                                color="primary"
                                                                disabled
                                                                sx={{ cursor: 'not-allowed' }}
                                                            >
                                                                {url.shortUrl}
                                                            </Button>
                                                        </span>
                                                    </Tooltip>
                                                )}
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
                    )}
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