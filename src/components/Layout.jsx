// src/components/Layout.jsx
import React from "react";
import Box from "./Box";
import Navigation from "../Navigation"; // Ajuste o caminho conforme necessário

const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <Box>{children}</Box>
    </div>
  );
};

export default Layout;
