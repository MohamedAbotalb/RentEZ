import axiosInstance from 'services/axiosConfig';

export const fetchUserNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications/renter');
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch user notifications: ${error.message}`);
  }
};

export const fetchLandlordNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications/landlord');
    return response.data.data;
  } catch (error) {
    throw new Error(`Failed to fetch landlord notifications: ${error.message}`);
  }
};

export const declineTourRequest = async (tourId, message) => {
  const url = `/tours/${tourId}/decline`;
  const body = { message };
  try {
    const response = await axiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to decline tour: ${error.message}`);
  }
};

export const approveTourDate = async ({ tourId, selectedDate }) => {
  const url = `/tours/${tourId}/approve`;
  try {
    const response = await axiosInstance.post(url, {
      tour_date: selectedDate.id,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to approve tour date: ${error.message}`);
  }
};

export const deleteNotification = async (id) => {
  const url = `/notifications/${id}`;
  try {
    await axiosInstance.delete(url);
    return { id };
  } catch (error) {
    throw new Error(`Failed to delete notification: ${error.message}`);
  }
};
