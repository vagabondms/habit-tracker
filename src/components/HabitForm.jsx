import React, { useEffect, useRef } from "react";

const Input = ({ addHabit }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;

    value && addHabit({ name: value });

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} className="add-input"></input>
      <button className="add-button">add</button>
    </form>
  );
};

export default Input;
