import { Box, Button, Container, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleCrearMalla = () => {
    navigate("/crear-malla");
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#66B3FF",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Gestiona tus mallas curriculares fácilmente
          </Typography>
          <Typography variant="h6" mb={4}>
            Crea, organiza y visualiza tu plan de estudios como nunca antes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              fontWeight: "bold",
            }}
            onClick={handleCrearMalla}
          >
            Empezar Ahora
          </Button>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          ¿Qué es MiMalla?
        </Typography>
        <Typography variant="body1" textAlign="center">
          Es una herramienta diseñada para estudiantes que quieren planificar y
          gestionar su malla curricular. Puedes crear tus propios semestres,
          agregar ramos y organizar tu avance académico de forma visual y
          sencilla.
        </Typography>
      </Container>

      <Box bgcolor="#f5f5f5" py={8}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Características principales
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: 6,
            mt: 4,
          }}
        >
          <Feature
            icon={<AccessTimeIcon color="primary" sx={{ fontSize: 48 }} />}
            title="Rápido y sencillo"
            description="Organiza tu malla curricular en minutos sin complicaciones."
          />
          <Feature
            icon={<TouchAppIcon color="primary" sx={{ fontSize: 48 }} />}
            title="Interfaz intuitiva"
            description="Diseño pensado para que todo sea fácil y accesible."
          />
          <Feature
            icon={<SchoolIcon color="primary" sx={{ fontSize: 48 }} />}
            title="Para estudiantes"
            description="Pensado especialmente para las necesidades de los estudiantes."
          />
        </Box>
      </Box>

      <Box py={10} textAlign="center">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ¿Listo para comenzar?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 6, width: { xs: "100%", sm: "auto" } }}
          onClick={handleCrearMalla}
        >
          Ver malla
        </Button>
      </Box>
    </Box>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Box textAlign="center" maxWidth={280} px={2}>
      <Box sx={{ mb: 2 }}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
}
