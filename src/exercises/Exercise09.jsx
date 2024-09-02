import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";
import { db } from "../auth/firebaseConfig"; // Correto
import { collection, addDoc } from "firebase/firestore";

const Exercise09 = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para a mensagem de sucesso

  const onSubmit = async (data) => {
    try {
      // Adiciona os dados ao Firestore
      await addDoc(collection(db, "contacts"), data);
      setSuccessMessage("Dados salvos com sucesso!"); // Define a mensagem de sucesso
      reset(); // Reseta os campos após o envio
    } catch (error) {
      console.error("Erro ao salvar os dados: ", error);
      alert("Erro ao salvar os dados.");
    }
  };

  // Inline styles
  const errorMessageStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "5px"
  };

  const successMessageStyle = {
    color: "green",
    fontSize: "16px",
    marginBottom: "15px",
    fontWeight: "bold"
  };

  return (
    <>
      <h1>Exercício 09</h1>
      <Box style={{ width: "400px", margin: "0 auto" }}>
        <h2>Formulário de Contato</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Nome:</label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Digite seu nome"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && <p style={errorMessageStyle}>{errors.name.message}</p>}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu email"
              {...register("email", { 
                required: "Email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido"
                }
              })}
            />
            {errors.email && <p style={errorMessageStyle}>{errors.email.message}</p>}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phone">Telefone:</label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Digite seu telefone"
              {...register("phone", { 
                required: "Telefone é obrigatório",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Telefone deve conter apenas números"
                }
              })}
            />
            {errors.phone && <p style={errorMessageStyle}>{errors.phone.message}</p>}
          </div>
          {successMessage && <p style={successMessageStyle}>{successMessage}</p>} {/* Exibe a mensagem de sucesso */}
          <Button text="Enviar" type="submit" />
        </form>
      </Box>
    </>
  );
};

export default Exercise09;
