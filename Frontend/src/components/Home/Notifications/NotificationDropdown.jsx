import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchRenterNotifications,
  fetchLandlordNotifications,
} from 'store/Notifications/notificationsSlice';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { green, red, orange } from '@mui/material/colors';
import moment from 'moment';

const NotificationDropdown = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, status, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (role === 'user') {
      dispatch(fetchRenterNotifications());
    } else if (role === 'landlord') {
      dispatch(fetchLandlordNotifications());
    }
  }, [dispatch, role]);

  // Select the last 4 notifications
  const lastFourNotifications = notifications.slice(Math.max(notifications.length - 4, 0));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification) => {
    handleMenuClose(); // Close the menu
    if (role === 'user') {
      navigate('/renter-notifications'); // Navigate to renter notifications page
    } else if (role === 'landlord') {
      navigate('/landlord-notifications'); // Navigate to landlord notifications page
    }
  };

  const handleShowAllNotifications = () => {
    handleMenuClose(); // Close the menu
    if (role === 'user') {
      navigate('/renter-notifications'); // Navigate to renter notifications page
    } else if (role === 'landlord') {
      navigate('/landlord-notifications'); // Navigate to landlord notifications page
    }
  };

  return (
    <>
      <IconButton
        aria-label="show notifications"
        color="inherit"
        onClick={handleMenuOpen}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { width: 500 } }}
      >
        <Box sx={{ padding: 1, display: 'flex', flexDirection: 'column' }}>
          <List sx={{ width: '100%', p: 0 }}>
            {lastFourNotifications.map((notification) => (
              <ListItem
                key={notification.id}
                disablePadding
                onClick={() => handleNotificationClick(notification)}
                sx={{ mb: 1 }}
              >
                {role === 'user' ? (
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      borderLeft: `5px solid ${
                        notification.tour.status === 'approved'
                          ? green[500]
                          : notification.tour.status === 'declined'
                          ? red[500]
                          : orange[500]
                      }`,
                      width: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemAvatar>
                        <Avatar
                          alt={notification.landlord.first_name}
                          src={notification.landlord.avatar}
                        />
                      </ListItemAvatar>
                      <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                          {`${notification.landlord.first_name} ${notification.landlord.last_name}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ mb: 1 }}
                        >
                          {moment(notification.created_at).format(
                            'MMMM DD, YYYY hh:mm A'
                          )}
                        </Typography>
                        <Typography variant="body1">
                          {notification.message}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ) : (
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)',
                      },
                    }}
                  >
                    <Typography variant="body1">
                      {notification.message}
                    </Typography>
                  </Paper>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
        <MenuItem onClick={handleShowAllNotifications}>
          <Typography variant="inherit">Show All</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationDropdown;
