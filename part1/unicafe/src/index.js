import React, { useState } from "react";
import ReactDOM from "react-dom";
import Statistics from "./components/Statistics";
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const handleClickGood = () => {
    setGood(good + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };
  return (
    <div>
      <h2>Give feedback</h2>
      <p>
        <button onClick={handleClickGood}>Good</button>
        <button onClick={handleClickNeutral}>Neutral</button>
        <button onClick={handleClickBad}>Bad</button>
      </p>
      <h2>Statistics</h2>
      {!!good || !!neutral || !!bad ? (
        <table>
          <tbody>
            <Statistics text={"Good"} value={good} />
            <Statistics text={"Neutral"} value={neutral} />
            <Statistics text={"Bad"} value={bad} />
            <Statistics text={"All"} value={good + bad + neutral} />
            <Statistics
              text={"Average"}
              value={(good - bad) / (good + bad + neutral)}
            />
            <Statistics
              text={"Positive"}
              value={(good * 100) / (good + neutral + bad) + " %"}
            />
          </tbody>
        </table>
      ) : (
        <h2>No feedback given</h2>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
