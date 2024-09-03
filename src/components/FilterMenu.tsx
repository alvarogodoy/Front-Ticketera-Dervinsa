import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface FilterMenuProps {
  onFilterChange: (filterBy: string) => void;
  sx?: object;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange, sx }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (filterBy: string) => {
    onFilterChange(filterBy);
    handleClose();
  };

  return (
    <Box sx={sx}>
      <Button
        disableRipple
        disableTouchRipple
        aria-controls="sort-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center" }} // Alineación central para el ícono y el texto
      >
        <FilterAltIcon sx={{ marginRight: 1 }} /> Mostrar
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick("Todos")}>Todos</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Sin asignar")}>
          Sin asignar
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Asignados a mi")}>
          Asignados a mi
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default FilterMenu;
