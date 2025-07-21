import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import MallaForm from "./MallaForm";
import { useState } from "react";

interface MallaFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (nombre: string, semestres: number) => void;
}

const MallaFormModal = ({ open, onClose, onSave }: MallaFormModalProps) => {
  const [nombre, setNombre] = useState("");
  const [semestres, setSemestres] = useState(0);

  const handleGuardar = () => {
    onSave(nombre, semestres);
    setNombre("");
    setSemestres(8);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <MallaForm
          nombre={nombre}
          setNombre={setNombre}
          semestres={semestres}
          setSemestres={setSemestres}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MallaFormModal;
