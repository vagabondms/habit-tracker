import React from "react";

const Habit = ({
  id,
  name,
  count,
  decreaseCount,
  increaseCount,
  deleteHabit,
}) => {
  return (
    <div className="habit">
      <span className="habit-name">{name}</span>
      <span className="habit-count">{count}</span>
      <button
        onClick={() => {
          increaseCount({ id });
        }}
        className="habit-button habit-increase"
      >
        <i className="fas fa-plus"></i>
      </button>
      <button
        onClick={() => {
          decreaseCount({ id });
        }}
        className="habit-button habit-decrease"
      >
        <i className="fas fa-minus"></i>
      </button>
      <button
        onClick={() => {
          deleteHabit({ id });
        }}
        className="habit-button habit-delete"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Habit;
