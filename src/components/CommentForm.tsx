import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

const CommentForm: React.FC<{ onSubmit: (contenido: string) => void }> = ({
  onSubmit,
}) => {
  const [contenido, setContenido] = useState("");

  const handleSubmit = () => {
    if (contenido) {
      onSubmit(contenido);
      setContenido("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <TextField
        label="Comentario"
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        fullWidth
        margin="normal"
        multiline
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Comentar
      </Button>
    </Box>
  );
};

export default CommentForm;
