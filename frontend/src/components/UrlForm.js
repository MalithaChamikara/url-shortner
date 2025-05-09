import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, FormControl } from '@mui/material';
import axios from 'axios';
import { BACKEND_API } from '../apiConfig';


const UrlForm = ({ onUrlCreated, onCancel }) => {

    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [expiryDays, setExpiryDays] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(`${BACKEND_API}/urls/shortenUrl`, {
                originalUrl,
                alias,
                expiryDays,
            });
            onUrlCreated(response.data.shortUrl);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
            <TextField
                fullWidth
                label="Original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Custom Alias (Optional)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <Select value={expiryDays} onChange={(e) => setExpiryDays(e.target.value)} displayEmpty>
                    <MenuItem value="" disabled >Select Expiry Days</MenuItem>
                    <MenuItem value={1}>1 Day</MenuItem>
                    <MenuItem value={7}>7 Days</MenuItem>
                    <MenuItem value={30}>30 Days</MenuItem>
                </Select>
            </FormControl>
            {error && <Box color="error.main" sx={{ mb: 2 }}>{error}</Box>}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? 'Shortening...' : 'Shorten URL'}
                </Button>
            </Box>
        </Box>
    );
};

export default UrlForm;