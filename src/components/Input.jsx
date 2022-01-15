import React, { useState } from "react";

const Input = ({ addHabit }) => {
  const [value, setValue] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;

    setValue(value);
  };
  const handleClick = () => {
    if (value.length <= 0) {
      return;
    }
    addHabit({ name: value });
    setValue("");
  };
  return (
    <>
      <input className="add-input" value={value} onInput={handleInput}></input>
      <button className="add-button" onClick={handleClick}>
        add
      </button>
    </>
  );
};

export default Input;
