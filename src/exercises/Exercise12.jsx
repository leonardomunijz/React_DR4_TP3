import React, { useState, useEffect } from "react";
import { db } from "../auth/firebaseConfig"; // Correto
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import DataTable from "react-data-table-component";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

const Exercise12 = () => {
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

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

  const handleRowSelected = async (row) => {
    try {
      const docRef = doc(db, "contacts", row.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSelectedContact(docSnap.data());
      } else {
        console.log("Nenhum documento encontrado!");
      }
    } catch (error) {
      console.error("Erro ao obter o contato: ", error);
    }
  };

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
      <h1>Exercício 12</h1>
      <Box style={{ width: "800px", margin: "0 auto" }}>
        <h2>Lista de Contatos</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          onRowClicked={handleRowSelected} // Função chamada ao selecionar uma linha
        />
        {selectedContact && (
          <Box style={{ marginTop: "20px" }}>
            <h2>Detalhes do Contato</h2>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="name">Nome:</label>
              <Input
                type="text"
                id="name"
                value={selectedContact.name || ""}
                readOnly
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                value={selectedContact.email || ""}
                readOnly
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="phone">Telefone:</label>
              <Input
                type="text"
                id="phone"
                value={selectedContact.phone || ""}
                readOnly
              />
            </div>
            <Button text="Fechar" onClick={() => setSelectedContact(null)} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Exercise12;
