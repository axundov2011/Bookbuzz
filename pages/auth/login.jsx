import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch} from "react-redux";
import { useForm } from 'react-hook-form';
import { fetchLogin } from '@/redux/slice/auth.slice';
 // API fonksiyonunuzun bulunduğu dosya

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      setSubmitting(true);
      
      // Dispatch login action
      const loginData = await dispatch(fetchLogin(values));

      if (!loginData.payload) {
        console.error("Login unsuccessful");
        return; // Optional: Handle error message display or logging
      }

      // Check if token is present in the response
      if ("token" in loginData.payload) {
        const userToken = loginData.payload.token;

        window.localStorage.setItem("userToken", userToken);

        // Redirect based on user role
        if (userToken === "user") {
          navigate("/home");
        } else {
          navigate("/login"); // Örnek olarak aynı yönlendirme kullanıldı.
        }
        message.success("Successful login :)");
      }

      // Fetch user data after successful login
      const userData = await dispatch(fetchUsers(values)); // Buraya dispatch ettiğinizde

      if ('user' in userData.payload) {
        const user = userData.payload.user;
        console.log('User:', user);
        window.localStorage.setItem('user', JSON.stringify(user));
      }

      reset(); // Formu sıfırla
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

const loginOptions = {
        name: { required: "Name is required" },
        email: { required: "Email is required" },
    };
  
  return (
    <Container maxWidth="sm">
      <Box mt={8} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>
        <Box mt={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              {...register('email', loginOptions.email)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              {...register('password', loginOptions.password)}              
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: '16px', backgroundColor: '#000' }}
              type="submit"
              disabled={isSubmitting}
              
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
