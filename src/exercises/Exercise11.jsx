import React, { useState, useEffect } from "react";
import { db } from "../auth/firebaseConfig"; // Correto
import { collection, getDocs } from "firebase/firestore";
import DataTable from "react-data-table-component";
import Box from "../components/Box";

const Exercise11 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(contacts);
      } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
      }
    };

    fetchData(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.phone,
      sortable: true,
    },
  ];

  return (
    <>
      <h1>Exercício 11</h1>
      <Box style={{ width: "600px", margin: "0 auto" }}>
        <h2>Lista de Contatos</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
        />
      </Box>
    </>
  );
};

export default Exercise11;
