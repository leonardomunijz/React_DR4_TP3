// src/exercises/Exercise03.jsx

import React, { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Input from "../components/Input";

const Exercise03 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Limpa o erro quando o usuário começa a digitar
    }));
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Nome é obrigatório.";
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Telefone é obrigatório.";
      valid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = "O telefone deve conter apenas números.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Nome: ${formData.name}, Telefone: ${formData.phone}`);
      setFormData({
        name: "",
        phone: "",
      });
    }
  };

  return (
    <>
      <h1>Exercício 03</h1>
      <Box style={{ width: "400px", margin: "0 auto" }}>
        <h2>Formulário de Contato</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Nome:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="phone">Telefone:</label>
            <Input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Digite seu telefone"
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>
          <Button text="Enviar" type="submit" />
        </form>
      </Box>
    </>
  );
};

export default Exercise03;
