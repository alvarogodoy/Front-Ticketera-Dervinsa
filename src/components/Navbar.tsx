import * as React from "react";
import {
  AppBar, Box, Toolbar, IconButton, Typography, Avatar, Tooltip, Menu, MenuItem,
  Container, Drawer, List, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";
import Rol from "../types/enums/Rol";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogout = () => logout();
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "right", my: 2 }}>
        <Typography variant="subtitle1" sx={avatarNameStyle}>
          {user?.nombre}
        </Typography>
        <Avatar variant="rounded" src={user?.urlPic} sx={avatarStyleMin} />
      </Box>
      <List>
        <Button fullWidth href="/tickets" sx={menuButtonStyle}>Mis Tickets</Button>
        {user?.rol === Rol.ADMIN ? (
          <Button fullWidth href="/dashboard" sx={menuButtonStyle}>Administracion de Usuarios</Button>
        ) : (
          <Button fullWidth href="/dashboard" sx={menuButtonStyle}>Gestión de Tickets</Button>
        )}
        <Button fullWidth onClick={handleLogout} sx={menuButtonStyle}>Cerrar Sesión</Button>
      </List>
    </Box>
  );

  const userAvatar = (
    <Box sx={{ flexGrow: 0, borderRadius: 2, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", }}>
      <Tooltip title="Abrir Opciones">
        <IconButton onClick={handleOpenUserMenu} sx={iconButtonStyle}>
          <Typography variant="h6" sx={avatarTextStyle}>{user?.nombre}</Typography>
          <Avatar sx={avatarStyleMax} variant="rounded" src={user?.urlPic} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }} id="menu-appbar" anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu} component="a" href="/tickets">
          <Typography textAlign="center">Mis Tickets</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu} component="a" href="/dashboard">
          <Typography textAlign="center">{user?.rol === Rol.ADMIN ? "Administracion de Usuarios" : "Gestión de Tickets"}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Cerrar Sesión</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={logoBoxStyle}>
              <img src="/img/logo2.png" alt="logo" style={logoStyle} />
              <Typography variant="h6" noWrap sx={titleStyle}>TICKETERA</Typography>
              {isAuthenticated && (
                <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
            {isAuthenticated && userAvatar}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary" anchor="right" open={mobileOpen}
          onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
          sx={drawerStyle}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

// Styles en orden
const avatarNameStyle = { maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginLeft: 2 };
const avatarStyleMin = { width: 35, height: 35, mr: 1, marginLeft: 1 };
const menuButtonStyle = { display: "flex", justifyContent: "right", textTransform: "none" };
const logoBoxStyle = { display: { xs: "flex", md: "flex" }, alignItems: "center", width: "100%", mr: 1 };
const logoStyle = { height: "40px", width: "auto" };
const titleStyle = { flexGrow: 1, mr: 2, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none", marginLeft: 3 };
const iconButtonStyle = {
	p: 0, "&:hover": { borderRadius: 2 },
	"&:hover .MuiTypography-root": { textShadow: "0 0 5px rgba(255, 255, 255, 0.8)" },
	"&:hover .MuiAvatar-root": { borderColor: "rgba(255, 255, 255, 0.8)" } };
const avatarTextStyle = {
	mr: 2, display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".1rem",
	color: "white", textDecoration: "none", border: "2px solid transparent", transition: "border-color 0.1s ease-in-out", };
const avatarStyleMax = { width: 45, height: 45, border: "2px solid transparent", transition: "border-color 0.1s ease-in-out" };
const drawerStyle = { display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 } };

export default Navbar;
