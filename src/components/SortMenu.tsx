import React, { useState } from "react";
import { Menu, MenuItem, Button, Box } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

interface SortMenuProps {
  onSortChange: (sortBy: string) => void;
  sx?: object;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSortChange, sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sortBy: string) => {
    onSortChange(sortBy);
    handleClose();
  };

  return (
    <Box 
      sx={
        sx
      }
    >
      <Button
        disableRipple
        disableTouchRipple
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center" }} // Alineación central para el ícono y el texto
      >
        <SortIcon sx={{ marginRight: 1 }} />{" "}
        Ordenar por
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("Mas nuevos")}>
          Mas nuevos
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Mas antiguos")}>
          Mas antiguos
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Prioridad mas alta")}>
          Prioridad mas alta
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Prioridad mas baja")}>
          Prioridad mas baja
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortMenu;
