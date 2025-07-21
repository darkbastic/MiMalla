import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
interface Ramo {
  id: string;
  nombre: string;
  aprobado: boolean;
  prerrequisitos: string[];
}
import { Snackbar, Alert } from "@mui/material";

interface RamoFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (nombre: string, prerrequisitos: string[]) => void;
  ramosDisponibles: Ramo[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RamoFormModal = ({
  open,
  onClose,
  onSave,
  ramosDisponibles,
}: RamoFormModalProps) => {
  const [nombre, setNombre] = useState("");
  const [prerrequisitos, setPrerrequisitos] = useState<string[]>([]);
  const [alerta, setAlerta] = useState<{
    mensaje: string;
    tipo: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!open) {
      setNombre("");
      setPrerrequisitos([]);
    }
  }, [open]);

  const handlePrerrequisitosChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    // value puede ser string (coma separada) o string[]
    setPrerrequisitos(typeof value === "string" ? value.split(",") : value);
  };

  const handleGuardar = () => {
    if (nombre.trim() === "") {
      mostrarAlerta("El nombre del ramo es obligatorio");
      return;
    }
    onSave(nombre, prerrequisitos);
  };

  const mostrarAlerta = (
    mensaje: string,
    tipo: "success" | "error" = "error"
  ) => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 4000); // Cierra automáticamente en 4s
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 300, pt: 2 }}>
        <TextField
          label="Nombre del ramo"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
          required
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="prerrequisitos-label">Prerrequisitos</InputLabel>
          <Select
            labelId="prerrequisitos-label"
            multiple
            value={prerrequisitos}
            onChange={handlePrerrequisitosChange}
            input={<OutlinedInput label="Prerrequisitos" />}
            renderValue={(selected) => {
              const selectedIds = selected as string[];
              const names = ramosDisponibles
                .filter((r) => selectedIds.includes(r.id))
                .map((r) => r.nombre);
              return names.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {ramosDisponibles.map((ramo) => (
              <MenuItem key={ramo.id} value={ramo.id}>
                <Checkbox checked={prerrequisitos.indexOf(ramo.id) > -1} />
                <ListItemText primary={ramo.nombre} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={handleGuardar} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
      {alerta && (
        <Snackbar
          open
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={alerta.tipo} variant="filled" sx={{ width: "100%" }}>
            {alerta.mensaje}
          </Alert>
        </Snackbar>
      )}
    </Dialog>
  );
};

export default RamoFormModal;
