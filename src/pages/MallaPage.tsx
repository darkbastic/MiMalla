import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import RoundButton from "../components/RoundButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import MallaForm from "../components/MallaFormModal";
import RamoFormModal from "../components/RamoFormModal";
import CardRamo from "../components/CardRamo";
import ExportJsonButton from "../components/ExportJsonButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { v4 as uuidv4 } from "uuid";

interface Ramo {
  id: string;
  nombre: string;
  aprobado: boolean;
  prerrequisitos: string[];
}

interface Semestre {
  id: string;
  numero: number;
  ramos: Ramo[];
}

export interface Malla {
  id: string;
  nombre: string;
  semestres: Semestre[];
}

interface SemestreActivo {
  mallaId: string;
  semestreId: string;
}

const MallaPage = () => {
  const [alerta, setAlerta] = useState<{
    mensaje: string;
    tipo: "success" | "error";
  } | null>(null);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoRamo, setModalAbiertoRamo] = useState(false);
  const [mallas, setMallas] = useState<Malla[]>(() => {
    const guardado = localStorage.getItem("mallas");
    if (guardado) {
      try {
        return JSON.parse(guardado) as Malla[];
      } catch {
        return [];
      }
    }
    return [];
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const mostrarAlerta = (
    mensaje: string,
    tipo: "success" | "error" = "error"
  ) => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 4000);
  };

  const [semestreActivo, setSemestreActivo] = useState<SemestreActivo | null>(
    null
  );

  useEffect(() => {
    localStorage.setItem("mallas", JSON.stringify(mallas));
  }, [mallas]);

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);

  const abrirModalRamo = (mallaId: string, semestreId: string) => {
    setSemestreActivo({ mallaId, semestreId });
    setModalAbiertoRamo(true);
  };

  const cerrarModalRamo = () => {
    setSemestreActivo(null);
    setModalAbiertoRamo(false);
  };

  const guardarMalla = (nombre: string, totalSemestres: number) => {
    if (!nombre.trim()) {
      mostrarAlerta("El nombre de la malla no puede estar vacío.");
      return;
    }

    if (!Number.isInteger(totalSemestres) || totalSemestres <= 0) {
      mostrarAlerta(
        "El total de semestres debe ser un número entero mayor a 0."
      );
      return;
    }
    const nuevaMalla: Malla = {
      id: uuidv4(),
      nombre,
      semestres: Array.from({ length: totalSemestres }, (_, i) => ({
        id: uuidv4(),
        numero: i + 1,
        ramos: [],
      })),
    };
    setMallas((prev) => [...prev, nuevaMalla]);
    cerrarModal();
    mostrarAlerta("Malla creada con éxito", "success");
  };

  const esMallaValida = (obj: unknown): obj is Malla => {
    if (!obj || typeof obj !== "object" || obj === null) {
      return false;
    }

    const o = obj as { [key: string]: unknown };

    if (
      typeof o.id !== "string" ||
      typeof o.nombre !== "string" ||
      !Array.isArray(o.semestres)
    ) {
      return false;
    }

    for (const semestre of o.semestres) {
      if (
        !semestre ||
        typeof semestre !== "object" ||
        typeof semestre.id !== "string" ||
        typeof semestre.numero !== "number" ||
        !Array.isArray(semestre.ramos)
      ) {
        return false;
      }

      for (const ramo of semestre.ramos) {
        if (
          !ramo ||
          typeof ramo !== "object" ||
          typeof ramo.id !== "string" ||
          typeof ramo.nombre !== "string" ||
          typeof ramo.aprobado !== "boolean" ||
          !Array.isArray(ramo.prerrequisitos)
        ) {
          return false;
        }
      }
    }

    return true;
  };

  const importarMallaDesdeArchivo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      mostrarAlerta("No se seleccionó ningún archivo.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contenido = e.target?.result;
        if (typeof contenido !== "string") {
          mostrarAlerta("Archivo inválido.", "error");
          return;
        }
        const mallaImportada = JSON.parse(contenido);

        if (Array.isArray(mallaImportada)) {
          const mallasValidas = mallaImportada.filter(esMallaValida);
          if (mallasValidas.length === 0) {
            mostrarAlerta("Archivo JSON no contiene malla válidas.", "error");
            return;
          }
          setMallas(mallasValidas);
          mostrarAlerta("Malla importadas correctamente", "success");
        } else {
          if (!esMallaValida(mallaImportada)) {
            mostrarAlerta(
              "El JSON importado no tiene formato válido de malla.",
              "error"
            );
            return;
          }
          setMallas([mallaImportada]);
          mostrarAlerta("Malla importada correctamente", "success");
        }
      } catch (error) {
        mostrarAlerta("Error al leer el archivo JSON.", "error");
        console.error(error);
      }
    };
    reader.readAsText(file);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const resetearRamos = (mallaId: string) => {
    const nuevasMallas = mallas.map((malla) => {
      if (malla.id === mallaId) {
        const todosAprobados = malla.semestres.every((semestre) =>
          semestre.ramos.every((ramo) => ramo.aprobado)
        );

        if (!todosAprobados) {
          mostrarAlerta(
            "No todos los ramos están aprobados, no se puede resetear."
          );
          return malla;
        }

        const semestresReseteados = malla.semestres.map((semestre) => ({
          ...semestre,
          ramos: semestre.ramos.map((ramo) => ({ ...ramo, aprobado: false })),
        }));

        mostrarAlerta("Ramos reseteados con éxito", "success");

        return {
          ...malla,
          semestres: semestresReseteados,
        };
      }
      return malla;
    });

    setMallas(nuevasMallas);
  };

  const guardarRamo = (nombreRamo: string, prerrequisitos: string[]) => {
    if (!semestreActivo) return;

    const nuevasMallas = mallas.map((malla) => {
      if (malla.id === semestreActivo.mallaId) {
        const nuevosSemestres = malla.semestres.map((semestre) => {
          if (semestre.id === semestreActivo.semestreId) {
            const nuevoRamo: Ramo = {
              id: uuidv4(),
              nombre: nombreRamo,
              aprobado: false,
              prerrequisitos,
            };
            return {
              ...semestre,
              ramos: [...semestre.ramos, nuevoRamo],
            };
          }
          return semestre;
        });
        return {
          ...malla,
          semestres: nuevosSemestres,
        };
      }
      return malla;
    });

    setMallas(nuevasMallas);
    cerrarModalRamo();
    mostrarAlerta("Ramo agregado correctamente", "success");
  };

  const toggleAprobado = (
    mallaId: string,
    semestreId: string,
    ramoId: string,
    nuevoEstado: boolean
  ) => {
    const nuevasMallas = mallas.map((malla) => {
      if (malla.id === mallaId) {
        const nuevosSemestres = malla.semestres.map((semestre) => {
          if (semestre.id === semestreId) {
            const nuevosRamos = semestre.ramos.map((ramo) => {
              if (ramo.id === ramoId) {
                const todosPrerrequisitosAprobados = ramo.prerrequisitos.every(
                  (prId) => {
                    let aprobado = false;
                    for (const s of malla.semestres) {
                      const prRamo = s.ramos.find((r) => r.id === prId);
                      if (prRamo && prRamo.aprobado) {
                        aprobado = true;
                        break;
                      }
                    }
                    return aprobado;
                  }
                );
                if (!todosPrerrequisitosAprobados && nuevoEstado) {
                  mostrarAlerta("Debes aprobar los prerrequisitos primero");
                  return ramo;
                }
                return { ...ramo, aprobado: nuevoEstado };
              }
              return ramo;
            });
            return { ...semestre, ramos: nuevosRamos };
          }
          return semestre;
        });
        return { ...malla, semestres: nuevosSemestres };
      }
      return malla;
    });
    setMallas(nuevasMallas);
  };

  const borrarRamo = (mallaId: string, semestreId: string, ramoId: string) => {
    const nuevasMallas = mallas.map((malla) => {
      if (malla.id === mallaId) {
        const nuevosSemestres = malla.semestres.map((semestre) => {
          if (semestre.id === semestreId) {
            const nuevosRamos = semestre.ramos.filter(
              (ramo) => ramo.id !== ramoId
            );
            return { ...semestre, ramos: nuevosRamos };
          }
          return semestre;
        });
        return { ...malla, semestres: nuevosSemestres };
      }
      return malla;
    });
    setMallas(nuevasMallas);
    mostrarAlerta("Ramo eliminado correctamente", "success");
  };

  const borrarMalla = () => {
    setMallas([]);
    localStorage.removeItem("mallas");
    mostrarAlerta("Todas las mallas han sido borradas", "success");
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        mb={2}
        gap={1}
      >
        <RoundButton
          icon={<AddIcon />}
          color="primary"
          onClick={abrirModal}
          tooltip="Agregar malla"
          disabled={mallas.length > 0}
        />

        <RoundButton
          icon={<DeleteIcon />}
          color="error"
          onClick={borrarMalla}
          tooltip="Borrar malla"
        />
        <RoundButton
          icon={<RestartAltIcon />}
          color="warning"
          onClick={() => {
            if (mallas.length > 0) {
              resetearRamos(mallas[0].id);
            }
          }}
          tooltip="Resetear ramos"
        />
        <ExportJsonButton mallas={mallas} />
        <RoundButton
          icon={<UploadFileIcon />}
          color="info"
          onClick={() => inputFileRef.current?.click()}
          tooltip="Importar malla JSON"
        />
        <input
          ref={inputFileRef}
          type="file"
          accept=".json,application/json"
          onChange={importarMallaDesdeArchivo}
          style={{ display: "none" }}
        />
      </Box>

      {mallas.map((malla) => (
        <Box key={malla.id} mb={4}>
          <Typography variant="h4" mb={4} textAlign="center">
            Mi malla curricular: {malla.nombre}
          </Typography>

          <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2}>
            {malla.semestres.map((sem) => (
              <Card key={sem.id} sx={{ width: 300, padding: 1 }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    Semestre {sem.numero}
                  </Typography>

                  {sem.ramos.map((ramo) => (
                    <CardRamo
                      key={ramo.id}
                      ramo={ramo}
                      todosRamos={malla.semestres.flatMap((s) => s.ramos)}
                      onToggleAprobado={(id, nuevoEstado) =>
                        toggleAprobado(malla.id, sem.id, id, nuevoEstado)
                      }
                      onBorrar={(id) => borrarRamo(malla.id, sem.id, id)}
                    />
                  ))}

                  <Box display="flex" justifyContent="center" mt={2}>
                    <RoundButton
                      icon={<AddIcon />}
                      color="primary"
                      onClick={() => abrirModalRamo(malla.id, sem.id)}
                      tooltip="Agregar ramo"
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      <MallaForm
        open={modalAbierto}
        onClose={cerrarModal}
        onSave={guardarMalla}
      />

      <RamoFormModal
        open={modalAbiertoRamo}
        onClose={cerrarModalRamo}
        onSave={guardarRamo}
        ramosDisponibles={
          semestreActivo
            ? mallas
                .find((m) => m.id === semestreActivo.mallaId)
                ?.semestres.flatMap((s) => s.ramos) || []
            : []
        }
      />

      {alerta && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={() => setAlerta(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAlerta(null)}
            severity={alerta.tipo}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alerta.mensaje}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default MallaPage;
