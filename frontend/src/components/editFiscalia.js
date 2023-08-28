import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Button } from "@mui/material/";
import apiFiscalia from "../api/fiscaliaApi";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ArrowBackRounded } from "@mui/icons-material";
import Maps from "./maps";

export default function Fiscalia() {
  const { pathId } = useParams();
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const setLocation = (loc) => {
    setLatitude(loc.lat);
    setLongitude(loc.lng);
  }

  const setValues = (data) => {
    setName(data && data.name);
    setAddress(data && data.address);
    setPhone(data && data.phone);
    setLatitude(data && data.latitude);
    setLongitude(data && data.longitude);
  };

  useEffect(() => {
    const getOneFiscalia = async (fiscaliaId) => {
      const response = await apiFiscalia.get("branch/" + fiscaliaId);
      console.log({ response });
      if (response.data && response.data.branch) {
        setValues(response.data.branch);
      }
    };

    if (pathId !== undefined && pathId !== null) {
      setIsUpdating(true);
      getOneFiscalia(pathId);
    }
  }, []);

  const validateEditFiscalia = (form) => {
    let validations = {};

    if (!form.name || form.name.length < 1) {
      validations.name = "El nombre es requerido";
    }

    if (!form.phone) {
      validations.phone = "El número de teléfono es requerido";
    } else if (form.phone.length < 8) {
      validations.phone = "Debe contener al menos 8 digitos";
    }

    if (!form.latitude || form.latitude.length < 1) {
      validations.latitude = "La latitud es requerida";
    }

    if (!form.longitude || form.name.longitude < 1) {
      validations.longitude = "La longitud es requerida";
    }

    if (!form.address || form.name.address < 1) {
      validations.address = "La direccion es requerida";
    }

    setErrors(validations);
    return validations;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fiscalia = { name, address, phone, latitude, longitude };
    let pathEndpoint = "branch";
    let apiMethod = "post";
    if (pathId !== undefined && pathId !== null) {
      pathEndpoint += `/${pathId}`;
      apiMethod = "put";
    }
    console.log({ fiscalia });

    const validations = validateEditFiscalia(fiscalia);
    console.log({ validations });

    if (Object.keys(validations).length === 0) {
      const response = await apiFiscalia[apiMethod](pathEndpoint, fiscalia);
      console.log({ response });

      if (response && response.data) {
        if (isUpdating) {
          if (response.data.success) {
            Swal.fire("Que bien!", "Se actualizó correctamente", "success");
          } else {
            Swal.fire("Que mal!", "No se pudo actualizar la fiscalia", "error");
          }
        } else {
          if (response.data.branch && response.data.branch.branchId) {
            Swal.fire("Que bien!", "Se guardó la fiscalia", "success");
            Swal.fire({
              title: "Que bien!",
              html: "Se guardó la fiscalia",
              timer: 1500,
              allowOutsideClick: false,
              icon: "success",
            }).then((result) => {
              Swal.fire({
                title: "Quieres registrar otra fiscalia?",
                showDenyButton: true,
                allowOutsideClick: false,
                confirmButtonText: "Si, registrar otra",
                denyButtonText: `No, regresar al inicio`,
                icon: "question",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire("De acuerdo!", "Registremos otra fiscalia", "info");
                  setValues("");
                } else if (result.isDenied) {
                  navigate("/");
                  Swal.fire("Perfecto!", "", "info");
                }
              });
            });
          } else {
            Swal.fire(
              "Que mal!",
              "No se pudo agregar la nueva fiscalia",
              "error"
            );
          }
        }
      } else {
        Swal.fire("Que mal!", "No se pudo guardar la fiscalia", "error");
      }
    } else {
      Swal.fire("Upss!", "Formulario invalido", "warning");
    }
  };

  const onChangePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.value.length <= 8) {
        setPhone(e.target.value);
      }
    }
  };

  return (
    <div className="parent-div">
      <div className="child-div">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, borderSpacing: "20px" },
          }}
          noValidate
          autoComplete="off"
        >
          <Paper elevation={3} style={paperStyle}>
            <h1 style={{ color: "#1B2668" }}>Formulario</h1>
            <TextField
              id="outlined-helperText"
              label="Nombre"
              variant="filled"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-error">{errors.name}</p>}

            <TextField
              id="outlined-helperText"
              label="Dirección"
              variant="filled"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="text-error">{errors.address}</p>}

            <TextField
              id="outlined-helperText"
              label="Número de teléfono"
              variant="filled"
              fullWidth
              value={phone}
              onChange={(e) => onChangePhone(e)}
            />
            {errors.phone && <p className="text-error">{errors.phone}</p>}

            <div className="parent-div">
              <div className="child-div">
                <TextField
                  id="outlined-helperText"
                  label="Latitud"
                  variant="filled"
                  fullWidth
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                {errors.latitude && (
                  <p className="text-error">{errors.latitude}</p>
                )}
              </div>

              <div className="child-div">
                <TextField
                  id="outlined-helperText"
                  label="Longitud"
                  variant="filled"
                  fullWidth
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
                {errors.longitude && (
                  <p className="text-error">{errors.longitude}</p>
                )}
              </div>
            </div>

            <Button
              variant="contained"
              onClick={handleSubmit}
              style={{ marginTop: "5px" }}
            >
              Enviar
            </Button>
          </Paper>
        </Box>
      </div>
      <div className="child-div maps-frame">
        <Maps latitude={latitude} longitude={longitude} setLocation={setLocation} />
      </div>

      <button onClick={() => navigate("/")} className="blue-btn floating-btn">
        {<ArrowBackRounded />}
      </button>
    </div>
  );
}
