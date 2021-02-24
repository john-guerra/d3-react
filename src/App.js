import "./App.css";
import React, { useState } from "react";
import FancyChart from "./FancyChart.js";
import FancyChart2 from "./FancyChart2.js";

function App() {
  const [data, setData] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      name: "John" + i,
      age: Math.random() * 80,
    }))
  );

  return (
    <div className="App">
      <h1>Here comes my chart</h1>

      <FancyChart data={data}></FancyChart>

      <FancyChart2 data={data}></FancyChart2>

      <button
        onClick={() =>
          setData(data.concat([{ name: "John" + data.length, age: 35 }]))
        }
      >
        Add
      </button>

      <footer>By John with ❤️</footer>
    </div>
  );
}

export default App;
