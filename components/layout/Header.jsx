import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectAuthData } from '@/redux/slice/auth.slice';

const Header = () => {
  const router = useRouter();
  const authData = useSelector(selectAuthData);

  useEffect(() => {
    if (!authData) {
      router.push('/auth/login');
    }
  }, [authData, router]);

  return (
    <Container>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h4">BookBuzz</Typography>
        </Grid>
        <Grid item>
          <TextField
            placeholder="Search for books by title, author, or ISBN"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton>
            <ShoppingCartIcon />
          </IconButton>
          <Link href="/auth/login">
            <Button variant="contained" startIcon={<AccountCircleIcon />}>
              Login
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src="/images/home1.jpg"
              alt=""
              layout="fill"
              objectFit="contain"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">The Wooden Table</Typography>
            <Typography variant="body1" paragraph>
              Introducing our stunning designer wooden table, the perfect
              addition to any modern home. Crafted from premium quality oak
              wood, this table boasts a beautiful natural grain and rich texture
              that adds warmth and character to any room. With its sleek,
              minimalist design, this table is both functional and stylish,
              making it the ideal choice for any contemporary living space.
            </Typography>
            <Box>
              <Button variant="outlined" size="small">
                Tag1
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{ marginLeft: "8px" }}
              >
                Tag2
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={{ marginLeft: "8px" }}
              >
                Tag3
              </Button>
            </Box>
            <Box mt={2} ml={2} display="flex">
              <Box display="flex" alignItems="center">
                <img
                  src="/images/home1.jpg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  style={{ width: "60px", borderRadius: "50%" }}
                />
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  John Smith
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <img
                  src="/images/home1.jpg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                  style={{ width: "60px", borderRadius: "50%" }}
                />
                <Typography variant="body2" style={{ marginLeft: "8px" }}>
                  Wooden Bookends
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body2" style={{ margin: "0 8px" }}>
                1
              </Typography>
              <IconButton>
                <AddIcon />
              </IconButton>
              <Typography variant="h6" style={{ marginLeft: "16px" }}>
                14.00$
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ marginTop: "8px" }}
            >
              In Stock: 5
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mt={8} py={4} bgcolor="#f5f5f5">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">BookBuzz</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Social</Typography>
            <Typography variant="body2">Facebook</Typography>
            <Typography variant="body2">Instagram</Typography>
            <Typography variant="body2">LinkedIn</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Get help</Typography>
            <Typography variant="body2">Partner with us</Typography>
            <Typography variant="body2">Add your bookshop</Typography>
            <Typography variant="body2">Sign up to sell books</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">Read our blog</Typography>
            <Typography variant="body2">Buy gift card</Typography>
            <Typography variant="body2">Bookshops nearby</Typography>
            <Typography variant="body2">Save on first order</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Header;
