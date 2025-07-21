import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Ramo {
  id: string;
  nombre: string;
  aprobado: boolean;
  prerrequisitos: string[];
}

interface CardRamoProps {
  ramo: Ramo;
  todosRamos: Ramo[];
  onToggleAprobado: (id: string, nuevoEstado: boolean) => void;
  onBorrar: (id: string) => void;
}

const CardRamo: React.FC<CardRamoProps> = ({
  ramo,
  todosRamos,
  onToggleAprobado,
  onBorrar,
}) => {
  const prerrequisitosAprobados = ramo.prerrequisitos.every((prId) => {
    const prerrequisito = todosRamos.find((r) => r.id === prId);
    return prerrequisito?.aprobado === true;
  });

  const puedeAprobar = prerrequisitosAprobados;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!puedeAprobar) return;
    onToggleAprobado(ramo.id, e.target.checked);
  };

  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          "&:last-child": { pb: 1 },
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip
            title={
              !puedeAprobar ? "Debes aprobar los prerrequisitos primero" : ""
            }
          >
            <span>
              {/* El span permite que Tooltip funcione aunque Checkbox esté deshabilitado */}
              <Checkbox
                checked={ramo.aprobado}
                onChange={handleChange}
                disabled={!puedeAprobar}
              />
            </span>
          </Tooltip>

          <Typography
            variant="body1"
            sx={{
              textDecoration: ramo.aprobado ? "line-through" : "none",
              color: ramo.aprobado ? "text.disabled" : "text.primary",
            }}
          >
            {ramo.nombre}
          </Typography>
        </Box>

        <IconButton
          aria-label="borrar ramo"
          onClick={() => onBorrar(ramo.id)}
          size="small"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CardRamo;
