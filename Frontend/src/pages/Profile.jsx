import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import { toast } from 'react-toastify';
import ProfileHeader from 'components/UserProfile/ProfileHeader';
import EditDialog from 'components/UserProfile/EditDialog';
import PasswordDialog from 'components/UserProfile/PasswordDialog';
import AvatarDialog from 'components/UserProfile/AvatarDialog';
import PhoneDialog from 'components/UserProfile/PhoneDialog';
import DeleteDialog from 'components/UserProfile/DeleteDialog';
import ProfileDetails from 'components/UserProfile/ProfileDetails';
import {
  fetchUser,
  updateName,
  updatePassword,
  updatePhone,
  updateAvatar,
  deleteUser,
} from 'store/userSlice';
import { setCredentials, logout } from 'store/Auth/authSlice';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('First Name is required'))
      .min(3, t('First Name should be more than 2 characters'))
      .matches(
        /^[A-Za-z]+$/,
        t('First Name should contain only alphabetic characters')
      ),
    lastName: Yup.string()
      .required(t('Last Name is required'))
      .min(3, t('Last Name should be more than 2 characters'))
      .matches(
        /^[A-Za-z]+$/,
        t('Last Name should contain only alphabetic characters')
      ),
    newPassword: Yup.string()
      .min(8, t('Password must be at least 8 characters long'))
      .matches(
        /[A-Z]/,
        t('Password must contain at least one uppercase letter')
      )
      .matches(
        /[a-z]/,
        t('Password must contain at least one lowercase letter')
      )
      .matches(/[0-9]/, t('Password must contain at least one number'))
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        t('Password must contain at least one special character')
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('Passwords do not match'))
      .required(t('Password confirmation is required')),
    phone: Yup.string()
      .required(t('Phone Number is required'))
      .matches(
        /^01[0125][0-9]{8}$/,
        t('Phone Number must be a valid Egyptian phone number')
      ),
  });

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openPhoneDialog, setOpenPhoneDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editField, setEditField] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      if (user.phone_number.startsWith('+2')) {
        setPhone(user.phone_number.slice(2));
      } else {
        setPhone(user.phone_number);
      }
    }
  }, [user]);

  const handleEditClick = (field) => {
    setEditField(field);
    if (field === 'Password') {
      setOpenPasswordDialog(true);
    } else if (field === 'Phone') {
      setOpenPhoneDialog(true);
    } else {
      setOpenEditDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenAvatarDialog(false);
    setOpenEditDialog(false);
    setOpenPasswordDialog(false);
    setOpenPhoneDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleAvatarChange = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const response = await dispatch(updateAvatar(formData)).unwrap();
        dispatch(setCredentials({ ...user, avatar: response.user.avatar }));
        toast.success('Avatar updated successfully');
        setOpenAvatarDialog(false);
      } catch (error) {
        toast.error(error || 'Failed to update avatar');
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUser(user.id));
      dispatch(logout());
      toast.success(t('Account deleted successfully'));
      navigate('/login');
    } catch (error) {
      toast.error(t('Failed to delete account'));
    }
  };

  const handleSave = async () => {
    let valid = true;

    const validate = async () => {
      if (editField === 'Name') {
        const schema = validationSchema.pick(['firstName', 'lastName']);
        try {
          await schema.validate({ firstName, lastName }, { abortEarly: false });
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      } else if (editField === 'Password') {
        const schema = validationSchema.pick([
          'newPassword',
          'confirmPassword',
        ]);
        try {
          await schema.validate(
            { newPassword, confirmPassword },
            { abortEarly: false }
          );
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      } else if (editField === 'Phone') {
        const schema = validationSchema.pick(['phone']);
        try {
          await schema.validate({ phone }, { abortEarly: false });
          setErrors({});
        } catch (err) {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });
          setErrors(validationErrors);
          valid = false;
        }
      }
    };

    await validate();

    if (!valid) return;

    try {
      if (editField === 'Name') {
        dispatch(updateName({ first_name: firstName, last_name: lastName }));
        dispatch(
          setCredentials({
            ...user,
            first_name: firstName,
            last_name: lastName,
          })
        );
        toast.success(t('Profile updated successfully'));
      } else if (editField === 'Password') {
        dispatch(
          updatePassword({
            current_password: currentPassword,
            new_password: newPassword,
          })
        );
        toast.success(t('Password changed successfully'));
      } else if (editField === 'Phone') {
        dispatch(updatePhone({ phone_number: `+2${phone}` }));
        dispatch(setCredentials({ ...user, phone_number: `+2${phone}` }));
        toast.success(t('Phone number updated successfully'));
      }
      handleDialogClose();
    } catch (error) {
      toast.error(t('Failed to update profile'));
    }
  };

  const clearConfirmationText = () => {};

  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
            <ProfileHeader
              user={user}
              onEditAvatar={() => setOpenAvatarDialog(true)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProfileDetails
              user={user}
              onEditClick={handleEditClick}
              onDeleteClick={() => setOpenDeleteDialog(true)}
            />
          </Grid>
        </Grid>
      </Container>
      <EditDialog
        isOpen={openEditDialog}
        onClose={handleDialogClose}
        firstName={firstName}
        lastName={lastName}
        setFirstName={setFirstName}
        setLastName={setLastName}
        onSave={handleSave}
        errors={errors}
      />
      <PasswordDialog
        isOpen={openPasswordDialog}
        onClose={handleDialogClose}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        setCurrentPassword={setCurrentPassword}
        setNewPassword={setNewPassword}
        setConfirmPassword={setConfirmPassword}
        onSave={handleSave}
        errors={errors}
      />
      <AvatarDialog
        isOpen={openAvatarDialog}
        onClose={handleDialogClose}
        onSave={handleAvatarChange}
      />
      <PhoneDialog
        isOpen={openPhoneDialog}
        onClose={handleDialogClose}
        phone={phone}
        setPhone={setPhone}
        onSave={handleSave}
        errors={errors}
      />
      <DeleteDialog
        isOpen={openDeleteDialog}
        onClose={handleDialogClose}
        onDelete={handleDeleteAccount}
        clearConfirmationText={clearConfirmationText}
      />
    </Box>
  );
}

export default Profile;
