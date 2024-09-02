import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { collection, getDocs } from "firebase/firestore";
import Box from "../components/Box";
import { db } from "../auth/firebaseConfig"; // Importa a instância do Firestore

const Exercise10 = () => {
  const [contacts, setContacts] = useState([]);

  // Função para buscar os dados do Firestore
  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  useEffect(() => {
    fetchContacts(); // Busca os dados quando o componente é montado
  }, []);

  // Definindo as colunas da tabela
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name', // chave dos dados
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Telefone',
        accessor: 'phone',
      },
    ],
    []
  );

  // Configurando a tabela com react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: contacts });

  return (
    <>
      <h1>Exercício 10</h1>
      <Box style={{ width: "600px", margin: "0 auto" }}>
        <h2>Lista de Contatos</h2>
        <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style={{ borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ borderBottom: "1px solid #ddd" }}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} style={{ padding: "10px" }}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default Exercise10;
