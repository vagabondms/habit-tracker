import "./app.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Habits from "./components/Habits";

function App() {
  // const [habits, setHabits] = useState([{ habitName: "sex", habitCount: 0 }]);
  const [count, setCount] = useState(0);
  const handleCount = (newCount) => {
    setCount(newCount);
  };

  return (
    <>
      <Navbar count={count}></Navbar>
      <Habits handleCount={handleCount}></Habits>
    </>
  );
}

export default App;
