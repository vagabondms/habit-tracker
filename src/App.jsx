import "./app.css";
import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Habits from "./components/Habits";
import Input from "./components/Input";
import { v4 as uuidv4 } from "uuid";

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
        count: state[targetIndex].count++,
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
          state[targetIndex].count - 1 <= 0 ? 0 : state[targetIndex].count--,
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

  const navbarCount = habits.reduce((sum, habit) => {
    return habit.count + sum;
  }, 0);

  return (
    <>
      <Navbar count={navbarCount}></Navbar>
      <Input addHabit={addHabit}></Input>
      <Habits
        habits={habits}
        deleteHabit={deleteHabit}
        increaseCount={increaseCount}
        decreaseCount={decreaseCount}
      ></Habits>
      <button className="habits-reset" onClick={resetHabit}>
        Reset All
      </button>
    </>
  );
}

export default App;
