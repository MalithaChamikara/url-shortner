import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, Box, IconButton, Dialog, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import { fetchUrls } from './redux/urlSlice';

const App = () => {
  //
  // Redux dispatch to fetch URLs
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);

  // Function to handle URL creation and refresh the list
  const handleUrlCreated = (shortUrl) => {
    alert(`Short URL created: ${shortUrl}`);
    dispatch(fetchUrls({ name: '', date: '' })); // Refresh URL list
    setOpenForm(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">URL Shortener</Typography>
          <IconButton color="primary" onClick={() => setOpenForm(true)} aria-label="add">
            <AddIcon />
            <Typography variant="button" sx={{ ml: 1 }}>New URL</Typography>
          </IconButton>
        </Box>
        <UrlList />
        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogContent>
            <UrlForm onUrlCreated={handleUrlCreated} onCancel={() => setOpenForm(false)} />
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default App;