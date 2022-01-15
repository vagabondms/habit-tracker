import React from "react";
import Habit from "./Habit";
const Habits = ({ habits, deleteHabit, increaseCount, decreaseCount }) => {
  return (
    <div className="habits">
      {habits.map((habit) => (
        <Habit
          key={habit.id}
          {...habit}
          deleteHabit={deleteHabit}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
        ></Habit>
      ))}
    </div>
  );
};

export default Habits;
