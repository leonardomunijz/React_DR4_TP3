// src/exercises/Exercise04.jsx
import React from "react";
import { useForm } from "react-hook-form";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";

const Exercise04 = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    alert(`Nome: ${data.name}, Telefone: ${data.phone}`);
    reset(); // Reseta os campos após o envio
  };

  return (
    <>
      <h1>Exercício 04</h1>
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
              {...register("name", { required: true })} // Register with validation
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phone">Telefone:</label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Digite seu telefone"
              {...register("phone", { required: true })} // Register with validation
            />
          </div>
          <Button text="Enviar" type="submit" />
        </form>
      </Box>
    </>
  );
};

export default Exercise04;
