// src/exercises/Exercise06.jsx
import React from "react";
import { useForm } from "react-hook-form";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";

const Exercise06 = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Exibe os dados como JSON
    alert(`Dados do formulário:\n${JSON.stringify(data, null, 2)}`);
    reset(); // Reseta os campos após o envio
  };

  // Inline styles for error messages
  const errorMessageStyle = {
    color: "red",
    fontSize: "14px",
    marginTop: "5px"
  };

  return (
    <>
      <h1>Exercício 06</h1>
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
            {/* Display error message for name */}
            {errors.name && <p style={errorMessageStyle}>{errors.name.message}</p>}
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
            {/* Display error message for phone */}
            {errors.phone && <p style={errorMessageStyle}>{errors.phone.message}</p>}
          </div>
          <Button text="Enviar" type="submit" />
        </form>
      </Box>
    </>
  );
};

export default Exercise06;
