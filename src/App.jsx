import "./app.css";
import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Habits from "./components/Habits";
import { v4 as uuidv4 } from "uuid";
import HabitForm from "./components/HabitForm";

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
      return state.filter((habit) => habit.id !== action.id);
    }
    case actionType.INCREASE: {
      return state.map((habit) => {
        if (habit.id === action.id) {
          return {
            ...habit,
            count: habit.count + 1,
          };
        } else {
          return habit;
        }
      });
    }
    case actionType.DECREASE: {
      return state.map((habit) => {
        if (habit.id === action.id) {
          const newCount = habit.count - 1 <= 0 ? 0 : habit.count - 1;
          return {
            ...habit,
            count: newCount,
          };
        } else {
          return habit;
        }
      });
    }
    case actionType.RESET: {
      return state.map((habit) => ({ ...habit, count: 0 }));
    }
    default:
      return state;
  }
};

function App() {
  // const [habits, setHabits] = useState([{ habitName: "sex", habitCount: 0 }]);
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

  const count = habits.filter((habit) => habit.count > 0).length;

  return (
    <>
      <Navbar count={count}></Navbar>
      <HabitForm addHabit={addHabit}></HabitForm>
      <Habits
        habits={habits}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
        deleteHabit={deleteHabit}
      ></Habits>
      <button className="habits-reset" onClick={resetHabit}>
        Reset All
      </button>
    </>
  );
}

export default App;
