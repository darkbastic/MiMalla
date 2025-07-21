import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LayersIcon from "@mui/icons-material/Layers";
import SchoolIcon from "@mui/icons-material/School";

const BotonesFlotantes = ({
  onCrear,
  onAgregarSemestre,
  onAgregarRamo,
}: {
  onCrear: () => void;
  onAgregarSemestre: () => void;
  onAgregarRamo: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMobile ? 16 : "auto",
        right: isMobile ? 16 : 32,
        top: isMobile ? "auto" : 100,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        gap: 2,
        bgcolor: isMobile ? "transparent" : "#66B3FF",
        p: isMobile ? 0 : 2,
        borderRadius: 2,
        boxShadow: isMobile ? "none" : "0 4px 12px rgba(0,0,0,0.1)",
        zIndex: 1300,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={onCrear}
        sx={{ whiteSpace: "nowrap" }}
      >
        Crear Malla
      </Button>
      <Button
        variant="outlined"
        startIcon={<LayersIcon />}
        disabled
        onClick={onAgregarSemestre}
        sx={{ whiteSpace: "nowrap" }}
      >
        Agregar Semestre
      </Button>
      <Button
        variant="outlined"
        startIcon={<SchoolIcon />}
        disabled
        onClick={onAgregarRamo}
        sx={{ whiteSpace: "nowrap" }}
      >
        Agregar Ramo
      </Button>
    </Box>
  );
};

export default BotonesFlotantes;
