import {React,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import useLogin from '../../hooks/useLogin';

function Login({ open, handleClose,onSignupClick }) {
  const {login} = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const username = data.get('username');
    const password = data.get('password');
    
    try {

      await login({username, password});
      handleClose();
      
    } catch(error) {
      setErrorMessage(error.message || "Login failed");
      console.log(error)
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'white',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {/* Error message tag */}
            {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                InputProps={{ style: { color: 'white' } }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LOGIN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link  variant="body2" onClick={onSignupClick} className='cursor-pointer'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Modal>
    </ThemeProvider>
  );
}

export default Login;
