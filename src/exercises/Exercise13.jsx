import React, { useState, useEffect } from "react";
import { db } from "../auth/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import DataTable from "react-data-table-component";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

const Exercise13 = () => {
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

  const handleRowSelected = (row) => {
    setSelectedContact(row);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      // Atualiza a lista de contatos após a exclusão
      setData(data.filter(contact => contact.id !== id));
      setSelectedContact(null); // Limpa o contato selecionado
      alert("Contato excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o contato: ", error);
      alert("Erro ao excluir o contato.");
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
    {
      name: 'Ações',
      cell: row => (
        <Button
          text="Excluir"
          onClick={() => handleDelete(row.id)}
          className="button-danger"
        />
      ),
    },
  ];

  return (
    <>
      <h1>Exercício 13</h1>
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
            <div className="button-container">
              <Button
                text="Excluir"
                onClick={() => selectedContact && handleDelete(selectedContact.id)}
                className="button-danger"
              />
              <Button
                text="Fechar"
                onClick={() => setSelectedContact(null)}
              />
            </div>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Exercise13;
