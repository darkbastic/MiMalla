import React from "react";
import { Button, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import type { Malla } from "../pages/MallaPage";

interface ExportJsonButtonProps {
  mallas: Malla[];
}

const ExportJsonButton: React.FC<ExportJsonButtonProps> = ({ mallas }) => {
  const exportarJSON = () => {
    const json = JSON.stringify(mallas, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mallas.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Tooltip title="Exportar malla">
      <Button
        variant="contained"
        color="primary"
        onClick={exportarJSON}
        sx={{
          borderRadius: "50%",
          minWidth: 40,
          minHeight: 40,
          padding: 0,
        }}
      >
        <DownloadIcon />
      </Button>
    </Tooltip>
  );
};

export default ExportJsonButton;
