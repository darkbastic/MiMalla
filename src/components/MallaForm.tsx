import { Box, TextField, Typography } from "@mui/material";

interface MallaFormProps {
  nombre: string;
  setNombre: (value: string) => void;
  semestres: number;
  setSemestres: (value: number) => void;
}

const MallaForm = ({
  nombre,
  setNombre,
  semestres,
  setSemestres,
}: MallaFormProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} width={300}>
      <Typography variant="h5" textAlign="center">
        Agregar malla
      </Typography>
      <TextField
        label="Nombre de la malla"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Numero semestres"
        type="number"
        value={semestres}
        onChange={(e) => setSemestres(Number(e.target.value))}
        fullWidth
        required
      />
    </Box>
  );
};

export default MallaForm;
