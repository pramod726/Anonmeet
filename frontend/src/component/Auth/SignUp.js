import {React,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import useSignup from '../../hooks/useSignup';

function SignUp({ open, handleClose,onLoginClick }) {
  const {signup} = useSignup(); 
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return false;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return false;
    }
    try {
      await signup({ username, email, password, confirmPassword });
      handleClose();
  } catch (error) {
      setErrorMessage(error.message || "Signup failed");
      console.log(error)
  }
  };

  return (
    <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="signup-modal-title"
      aria-describedby="signup-modal-description"
    >
      <Container component="main" maxWidth="xs">
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
            Sign up
          </Typography>
          {/* Error message tag */}
          {errorMessage && (
              <Typography color="error" variant="body2" align="center">
                {errorMessage}
              </Typography>
            )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="User Name"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="text"
              id="confirm-password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SIGN UP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <div className='flex items-center mx-2'>
                  <p className='mr-1'>Already Sign up?</p>
                  <Link onClick={onLoginClick} className='cursor-pointer'>
                    {"Login"}
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Modal>
    </>
  );
}

export default SignUp;
