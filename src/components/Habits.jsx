import React from "react";
import Habit from "./Habit";

const Habits = ({ habits, increaseCount, decreaseCount, deleteHabit }) => {
  return (
    <>
      <ul className="habits">
        {habits.map((habit) => (
          <Habit
            key={habit.id}
            {...habit}
            deleteHabit={deleteHabit}
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
          ></Habit>
        ))}
      </ul>
    </>
  );
};

export default Habits;
