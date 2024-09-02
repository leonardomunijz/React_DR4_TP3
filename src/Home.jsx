import React from "react";

const Home = () => {
  return (
    <>
      <h1>Exercícios TP3</h1>
      <p className="description">
        Explore os exercícios desenvolvidos pelo aluno Leonardo Muniz. Use a
        barra de navegação no topo para acessar cada exercício e ver como foram
        resolvidos.
      </p>
      <div className="intro">
        <h2>Sobre os Exercícios</h2>
        <ul className="exercise-list">
          <li>
            <strong>Exercício 1:</strong> Formulário simples com `useState` para capturar nome e telefone.
          </li>
          <li>
            <strong>Exercício 2:</strong> Formulário com validação para campos obrigatórios: nome e telefone.
          </li>
          <li>
            <strong>Exercício 3:</strong> Formulário com validação para garantir que o campo telefone é numérico.
          </li>
          <li>
            <strong>Exercício 4:</strong> Formulário com `useForm` do `react-hook-form` para captura de dados.
          </li>
          <li>
            <strong>Exercício 5:</strong> Formulário com validação de telefone usando regex para permitir somente números.
          </li>
          <li>
            <strong>Exercício 6:</strong> Formulário que mostra os dados como JSON após o submit.
          </li>
          <li>
            <strong>Exercício 7:</strong> Formulário com `useForm` e três campos obrigatórios: nome, email e telefone.
          </li>
          <li>
            <strong>Exercício 8:</strong> Validação de email com regex no formulário do exercício 7.
          </li>
          <li>
            <strong>Exercício 9:</strong> Formulário do exercício 7, persistindo os dados no Firestore.
          </li>
          <li>
            <strong>Exercício 10:</strong> Listagem dos dados gravados no Firestore com uma lista simples.
          </li>
          <li>
            <strong>Exercício 11:</strong> Listagem dos dados no Firestore usando `react-data-table-component` ou equivalente.
          </li>
          <li>
            <strong>Exercício 12:</strong> Seleção de uma linha da lista para carregar os dados no formulário.
          </li>
          <li>
            <strong>Exercício 13:</strong> Exclusão de um registro da lista e do Firestore.
          </li>
          <li>
            <strong>Exercício 14:</strong> Edição de um registro na lista e no Firestore.
          </li>
          <li>
            <strong>Exercício 15:</strong> Formulário de login com `useForm` e integração com Firebase.
          </li>
          <li>
            <strong>Exercício 16:</strong> Formulário para obter o endereço completo a partir do CEP, usando o serviço ViaCEP.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;
