import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  Typography,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchPropertyTypes } from 'store/home/propertyTypeSlice';
import { fetchLocations } from 'store/home/locationsSlice';
import { fetchProperties } from 'store/home/propertiesSliceSearch';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  maxWidth: '800px',
  margin: '0 auto',
}));

const SearchFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '200px',
  marginBottom: theme.spacing(1),
  marginRight: theme.spacing(1),
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
    color: '#000',
    height: '56px',
  },
}));

const SearchButton = styled(Button)(() => ({
  minWidth: '56px',
  height: '56px',
  padding: 0,
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

function PropertySearch() {
  const dispatch = useDispatch();
  const propertyTypes = useSelector((state) => state.propertyTypes.data || []);
  const locations = useSelector((state) => state.locations.data || []);
  const locationsStatus = useSelector((state) => state.locations.status);
  const propertyTypesStatus = useSelector(
    (state) => state.propertyTypes.status
  );

  const [rentOrSell, setRentOrSell] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [locationId, setLocationId] = useState('');

  useEffect(() => {
    dispatch(fetchPropertyTypes());
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      fetchProperties({ propertyType, locationId, listingType: rentOrSell })
    );
  };

  return (
    <SearchContainer>
      <SearchFormControl variant="outlined">
        <Select
          value={rentOrSell}
          onChange={(e) => setRentOrSell(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            <em>Rent, Sell</em>
          </MenuItem>
          <MenuItem value="renting">Rent</MenuItem>
          <MenuItem value="selling">Sell</MenuItem>
        </Select>
      </SearchFormControl>

      <SearchFormControl variant="outlined">
        {locationsStatus === 'loading' ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Location</em>
            </MenuItem>
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.city}
              </MenuItem>
            ))}
          </Select>
        )}
      </SearchFormControl>

      <SearchFormControl>
        {propertyTypesStatus === 'loading' ? (
          <CircularProgress size={24} />
        ) : (
          <Select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Property Type</em>
            </MenuItem>
            {propertyTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </SearchFormControl>

      <SearchButton variant="contained" color="primary" onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>

      <CustomTypography variant="body1">
        {locationsStatus === 'loading' && 'Loading locations...'}
        {propertyTypesStatus === 'loading' && 'Loading property types...'}
        {locationsStatus === 'failed' && 'Failed to load locations'}
        {propertyTypesStatus === 'failed' && 'Failed to load property types'}
      </CustomTypography>
    </SearchContainer>
  );
}

export default PropertySearch;
