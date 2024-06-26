// src/store/reduxStore.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportUsersReducer from './reportUsersSlice';
import reportPropertiesReducer from './reportPropertiesSlice';
import propertyReducer from './propertySlice';
import propertyTypesReducer from './propertyTypesSlice';
import propertiesReducer from './propertiesSlice';
import wishlistReducer from './wishlistSlice';
import categoriesReducer from './categoriesSlice';
import overviewReducer from './overviewSlice';
import userDetailsReducer from './userDetailsSlice';
import amenitiesReducer from './amenitiesSlice';
import locationsReducer from './locationsSlice';

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    reportUsers: reportUsersReducer,
    reportProperties: reportPropertiesReducer,
    property: propertyReducer,
    propertyTypes: propertyTypesReducer,
    properties: propertiesReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer,
    overview: overviewReducer,
    userDetails: userDetailsReducer,
    amenities: amenitiesReducer,
    locations: locationsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default reduxStore;
