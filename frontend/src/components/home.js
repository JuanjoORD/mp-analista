import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import apiFiscalia from "../api/fiscaliaApi";
import ListOfFiscalias from "./fiscaliaTable";
import Swal from "sweetalert2";
import { AddTask as AddTaskIcon } from "@mui/icons-material"
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"

export default function Fiscalia() {
  const [fiscalias, setFiscalias] = useState([]);

  const getAllFiscalia = async () => {
    const response = await apiFiscalia.get("branch");
    console.log({ getAll: response });
    setFiscalias(response.data.branches);
  };

  const deleteFiscaliaService = async (id) => {
    const response = await apiFiscalia.delete("branch/" + id);
    console.log({ delete: response });
    await getAllFiscalia();
  };

  useEffect(() => {
    getAllFiscalia();
    console.log({ fiscaliasInit: fiscalias });
  }, []);

  const deleteFiscalia = (item) => {
    Swal.fire({
      title: "Quiere eliminar la fiscalia?",
      text: `${item.name} -- ${item.address}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminarla!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFiscaliaService(item.branchId);
        Swal.fire("De acuerdo!", "La fiscalia ha sido eliminada", "success");
      }
    });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": { m: 2 },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Fiscalias</h1>

      <Button variant="outlined" startIcon={<AddTaskIcon />}>
        <Link style={{ textDecoration: 'none' }} to={`/form`}>Agregar nueva fiscalia</Link>
      </Button>

      <ListOfFiscalias
        fiscalias={fiscalias}
        deleteFiscalia={deleteFiscalia}
      ></ListOfFiscalias>
    </Box>
  );
}
