// Login: admin@email.com
// Senha: admin123

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../auth/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";

const Exercise15 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true); // Atualiza o estado para indicar login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  if (loginSuccess) {
    return (
      <>
        <h1>Login Bem-Sucedido!</h1>
        <p align="center">Você está agora logado. Redirecione ou faça algo após o login.</p>
      </>
    );
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "15px", alignSelf: "center" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <Input
            type="email"
            id="email"
            {...register("email", { required: "Email é obrigatório" })}
            style={{ width: "100%" }}
          />
          {errors.email && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.email.message}</span>}
        </div>
        <div style={{ marginBottom: "15px", alignSelf: "center" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Senha:</label>
          <Input
            type="password"
            id="password"
            {...register("password", { required: "Senha é obrigatória" })}
            style={{ width: "100%" }}
          />
          {errors.password && <span style={{ color: "red", display: "block", marginTop: "5px" }}>{errors.password.message}</span>}
        </div>
        <Button 
          type="submit" 
          text="Entrar" 
          className="button-primary" 
          style={{ width: "85px", alignSelf: "center" }} 
        />
      </form>
    </>
  );
};

export default Exercise15;
