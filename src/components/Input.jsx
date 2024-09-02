// src/components/Input.jsx
import React, { forwardRef } from "react";

const Input = forwardRef(({ type, name, id, placeholder, className, ...rest }, ref) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`custom-input ${className ? className : ''}`} // Apply custom class with any additional class
      ref={ref}
      {...rest} // Spread the rest of the props
    />
  );
});

export default Input;
