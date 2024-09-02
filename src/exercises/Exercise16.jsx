import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

const Exercise16 = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [address, setAddress] = useState(null);

  const onSubmit = async (data) => {
    const { cep } = data;
    try {
      // Requisição para o serviço ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;

      // Verifica se o retorno é um erro do ViaCEP
      if (addressData.erro) {
        alert("CEP inválido. Tente novamente.");
        setAddress(null);
        return;
      }

      // Atualiza o estado com os dados do endereço
      setAddress(addressData);
    } catch (error) {
      console.error("Erro ao buscar o endereço: ", error);
      alert("Erro ao buscar o endereço. Tente novamente.");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Consulta de Endereço por CEP</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "15px", alignSelf: "center" }}>
          <label htmlFor="cep" style={{ display: "block", marginBottom: "5px" }}>CEP:</label>
          <Input
            type="text"
            id="cep"
            {...register("cep", {
              required: "CEP é obrigatório",
              pattern: {
                value: /^[0-9]{5}-?[0-9]{3}$/,
                message: "CEP inválido. Use o formato 00000-000."
              }
            })}
            style={{ width: "100%" }}
          />
          {errors.cep && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.cep.message}</span>}
        </div>
        <Button type="submit" text="Buscar" className="button-primary" style={{ width: "auto", alignSelf: "center" }} />
      </form>
      {address && (
        <Box style={{ marginTop: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
          <h2>Endereço Encontrado:</h2>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.localidade}</p>
          <p><strong>Estado:</strong> {address.uf}</p>
          <p><strong>CEP:</strong> {address.cep}</p>
        </Box>
      )}
    </>
  );
};

export default Exercise16;
