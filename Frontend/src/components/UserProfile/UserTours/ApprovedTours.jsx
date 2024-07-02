import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, CircularProgress, Pagination } from '@mui/material';
import { fetchToursByStatus } from 'store/tourSlice';
import TourCard from './TourCard';

const ITEMS_PER_PAGE = 6;

function ApprovedTours() {
  const dispatch = useDispatch();
  const { tours, isLoading } = useSelector((state) => state.tours);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchToursByStatus('approved'));
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedTours = tours.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!Array.isArray(tours) || tours.length === 0) {
    return <Typography>No tours found</Typography>;
  }

  return (
    <Box sx={{ paddingTop: 4, maxWidth: '80%', margin: '0 auto' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        {paginatedTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
        <Pagination
          count={Math.ceil(tours.length / ITEMS_PER_PAGE)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{ mt: 2 }}
        />
      </Box>
    </Box>
  );
}

export default ApprovedTours;