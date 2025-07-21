import React from "react";
import { Button, Tooltip } from "@mui/material";

interface RoundButtonProps {
  icon: React.ReactNode;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
}

const RoundButton = ({
  icon,
  color = "primary",
  onClick,
  tooltip,
  disabled = false,
}: RoundButtonProps) => {
  const button = (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      sx={{
        borderRadius: "50%",
        minWidth: 40,
        minHeight: 40,
        padding: 0,
      }}
      disabled={disabled}
    >
      {icon}
    </Button>
  );

  return tooltip ? (
    <Tooltip title={tooltip}>
      <span>{button}</span>
    </Tooltip>
  ) : (
    button
  );
};

export default RoundButton;
