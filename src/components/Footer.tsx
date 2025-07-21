import { Box, Typography, IconButton } from "@mui/material";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        gap: 1,
      }}
    >
      <Box>
        <IconButton
          href="https://www.tiktok.com/@daddy.bastic"
          target="_blank"
          color="primary"
          aria-label="tiktok"
        >
          <FaTiktok size={24} />
        </IconButton>
        <IconButton
          href="https://www.instagram.com/darkbastic?igsh=MTJxanBpaGFiNGJqdA=="
          target="_blank"
          color="primary"
          aria-label="instagram"
        >
          <FaInstagram size={24} />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: 14 }}>
        © 2025 miMalla. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
