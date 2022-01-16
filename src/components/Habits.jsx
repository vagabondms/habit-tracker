import React, { useReducer } from "react";
import Habit from "./Habit";
import { v4 as uuidv4 } from "uuid";
import Input from "./Input";

const actionType = {
  ADD: "add",
  DELETE: "delete",
  RESET: "reset",
  INCREASE: "increase",
  DECREASE: "decrease",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD: {
      return [...state, { id: uuidv4(), count: 0, name: action.name }];
    }
    case actionType.DELETE: {
      const targetIndex = state.findIndex((habit) => {
        return habit.id === action.id;
      });
      if (targetIndex === -1) {
        return state;
      }
      return [...state.slice(0, targetIndex), ...state.slice(targetIndex + 1)];
    }
    case actionType.INCREASE: {
      const targetIndex = state.findIndex((habit) => {
        return habit.id === action.id;
      });
      if (targetIndex === -1) {
        return state;
      }
      const newTarget = {
        ...state[targetIndex],
        count: state[targetIndex].count + 1,
      };

      return [
        ...state.slice(0, targetIndex),
        newTarget,
        ...state.slice(targetIndex + 1),
      ];
    }
    case actionType.DECREASE: {
      const targetIndex = state.findIndex((habit) => {
        return habit.id === action.id;
      });
      if (targetIndex === -1) {
        return state;
      }

      const newTarget = {
        ...state[targetIndex],
        count:
          state[targetIndex].count - 1 <= 0 ? 0 : state[targetIndex].count - 1,
      };
      return [
        ...state.slice(0, targetIndex),
        newTarget,
        ...state.slice(targetIndex + 1),
      ];
    }
    case actionType.RESET: {
      return [];
    }
    default:
      return state;
  }
};

const Habits = ({ handleCount }) => {
  const [habits, dispatch] = useReducer(reducer, []);

  const addHabit = ({ name }) => {
    return dispatch({ type: actionType.ADD, name });
  };

  const resetHabit = () => {
    return dispatch({ type: actionType.RESET });
  };

  const deleteHabit = ({ id }) => {
    return dispatch({ type: actionType.DELETE, id });
  };
  const increaseCount = ({ id }) => {
    return dispatch({ type: actionType.INCREASE, id });
  };
  const decreaseCount = ({ id }) => {
    return dispatch({ type: actionType.DECREASE, id });
  };

  const count = habits.reduce((sum, habit) => habit.count + sum, 0);
  handleCount(count);

  return (
    <>
      <Input addHabit={addHabit}></Input>
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
      <button className="habits-reset" onClick={resetHabit}>
        Reset All
      </button>
    </>
  );
};

export default Habits;
