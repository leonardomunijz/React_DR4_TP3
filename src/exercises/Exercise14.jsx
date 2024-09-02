import React, { useState, useEffect } from "react";
import { db } from "../auth/firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"; // Certifique-se de que deleteDoc está importado
import DataTable from "react-data-table-component";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

const Exercise14 = () => {
  const [data, setData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contacts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(contacts);
      } catch (error) {
        console.error("Erro ao buscar os dados: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setName(selectedContact.name || "");
      setEmail(selectedContact.email || "");
      setPhone(selectedContact.phone || "");
    }
  }, [selectedContact]);

  const handleRowSelected = (row) => {
    setSelectedContact(row);
  };

  const handleSave = async () => {
    if (selectedContact) {
      try {
        const contactRef = doc(db, "contacts", selectedContact.id);
        console.log("Atualizando contato com ID:", selectedContact.id);
        await updateDoc(contactRef, {
          name: name,
          email: email,
          phone: phone,
        });
        console.log("Contato atualizado com sucesso!");
        setData(data.map(contact => 
          contact.id === selectedContact.id ? { ...contact, name, email, phone } : contact
        ));
        setSelectedContact(null);
        alert("Contato atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar o contato: ", error);
        alert("Erro ao atualizar o contato.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      setData(data.filter(contact => contact.id !== id));
      setSelectedContact(null);
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
        <>
          <Button
            text="Excluir"
            onClick={() => handleDelete(row.id)}
            className="button-danger"
          />
        </>
      ),
    },
  ];

  return (
    <>
      <h1>Exercício 14</h1>
      <Box style={{ width: "800px", margin: "0 auto" }}>
        <h2>Lista de Contatos</h2>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          onRowClicked={handleRowSelected}
        />
        {selectedContact && (
          <Box style={{ marginTop: "20px" }}>
            <h2>Detalhes do Contato</h2>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="name">Nome:</label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="phone">Telefone:</label>
              <Input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="button-container">
              <Button
                text="Salvar"
                onClick={handleSave}
                className="button-save"
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

export default Exercise14;
