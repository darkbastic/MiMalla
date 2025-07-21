import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { text: "Inicio", to: "/" },
  { text: "Mi malla", to: "/crear-malla" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawer = (
    <Box sx={{ width: 240 }}>
      <Box sx={{ textAlign: "right", p: 1 }}>
        <IconButton onClick={handleDrawerToggle} aria-label="cerrar menú">
          <CloseIcon />
        </IconButton>
      </Box>

      <List onClick={handleDrawerToggle}>
        {navItems.map(({ text, to }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={Link}
              to={to}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            miMalla
          </Typography>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {navItems.map(({ text, to }) => (
              <Button key={text} color="inherit" component={Link} to={to}>
                {text}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/crear-malla"
            >
              Crear Malla
            </Button>
          </Box> */}

          <IconButton
            color="inherit"
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
