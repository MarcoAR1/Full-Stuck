import React, { useState } from "react";
import ReactDOM from "react-dom";
const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));
  const [mostVote, setMostVote] = useState(["no votes"]);

  const handleAnecdoteNext = () => {
    const number = Math.floor(Math.random() * anecdotes.length - 0);
    setSelected(number);
  };
  const handleAnecdoteVote = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
    if (copy[selected] > copy[mostVote[0]] || !copy[mostVote[0]]) {
      setMostVote([selected]);
    } else if (
      copy[selected] === copy[mostVote[0]] &&
      selected !== mostVote[0]
    ) {
      const copy = [...mostVote].concat(selected);
      setMostVote(copy);
    }
  };
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected] ? vote[selected] : "0"} votes</p>
      <button onClick={handleAnecdoteVote}>Vote</button>
      <button onClick={handleAnecdoteNext}>Next anecdotes</button>
      <h2>Anecdotes with most votes</h2>
      {vote[mostVote[0]] ? (
        <>
          {mostVote.map((e, i) => {
            return (
              <div key={i}>
                <p>{anecdotes[e]}</p>
                <p>has {vote[e]} votes</p>
              </div>
            );
          })}
        </>
      ) : (
        "No votes"
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
