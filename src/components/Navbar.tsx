import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth0();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          my: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: "250px", // adjust the max width as necessary
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginLeft: 2,
          }}
        >
          {user?.name}
        </Typography>
        <Avatar
          variant="rounded"
          src={user?.picture}
          sx={{
            width: 35,
            height: 35,
            mr: 1,
            marginLeft: 1,
          }}
        />
      </Box>
      <List>
        <Button
          fullWidth
          href="/tickets"
          sx={{
            display: "flex",
            justifyContent: "right",
            textTransform: "none", // Mantiene el texto sin transformarlo a mayúsculas
          }}
        >
          Mis Tickets
        </Button>

        <Button
          fullWidth
          href="/dashboard"
          sx={{
            display: "flex",
            justifyContent: "right",
            textTransform: "none",
          }}
        >
          Gestión de Ticket
        </Button>

        <Button
          fullWidth
          onClick={handleLogout}
          sx={{
            display: "flex",
            justifyContent: "right",
            textTransform: "none",
          }}
        >
          Cerrar Sesión
        </Button>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                width: "100%",
                mr: 1,
              }}
            >
              <img
                src="/img/logo2.png"
                alt="logo"
                style={{ height: "40px", width: "auto" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  flexGrow: 1,
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  marginLeft: 3,
                }}
              >
                TICKETERA
              </Typography>
              {isAuthenticated ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
              ) : null}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                mr: 1,
              }}
            >
              <img
                src="/img/logo2.png"
                alt="logo"
                style={{ height: "40px", width: "auto" }}
              />
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                marginLeft: 2,
              }}
            >
              TICKETERA
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            {isAuthenticated ? (
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Abrir Opciones">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0,
                      "&:hover": {
                        borderRadius: 2,
                      },
                      "&:hover .MuiTypography-root": {
                        //color: 'rgba(255, 255, 255, 0.8)',
                        textShadow: "0 0 5px rgba(255, 255, 255, 0.8)", // Añadido para iluminar el contorno del texto
                      },
                      "&:hover .MuiAvatar-root": {
                        borderColor: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "monospace",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "white",
                        textDecoration: "none",
                        marginLeft: 2,
                        border: "2px solid transparent",
                        transition: "border-color 0.1s ease-in-out",
                      }}
                    >
                      {user?.name}
                    </Typography>
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        border: "2px solid transparent",
                        transition: "border-color 0.1s ease-in-out",
                      }}
                      variant="rounded"
                      src={user?.picture}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component="a"
                    href="/tickets"
                  >
                    <Typography textAlign="center">Mis Tickets</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component="a"
                    href="/dashboard"
                  >
                    <Typography textAlign="center">
                      Gestión de Ticket
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Cerrar Sesión</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right" // Changed to 'right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
