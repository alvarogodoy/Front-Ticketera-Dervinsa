import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

const MAX_CHARACTERS = 255;

const CommentForm: React.FC<{ onSubmit: (contenido: string) => void }> = ({
  onSubmit,
}) => {
  const [contenido, setContenido] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (contenido) {
      onSubmit(contenido);
      setContenido("");
      setIsFocused(false);
    }
  };

  const handleCancel = () => {
    setContenido("");
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_CHARACTERS) {
      setContenido(e.target.value);
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    if (!contenido) setIsFocused(false); // Si no hay contenido, deshabilitar botones al perder el foco
  };

  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <TextField
        label="Comentario"
        placeholder="Agregar comentario"
        value={contenido}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        inputProps={{ maxLength: MAX_CHARACTERS }}
      />
      {isFocused && (
        <>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" mt={1}>
              <Typography variant="caption">
                {contenido.length}/{MAX_CHARACTERS} caracteres
              </Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button onClick={handleCancel} variant="outlined" color="secondary" style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} variant="contained" color="primary">
                Guardar
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CommentForm;
