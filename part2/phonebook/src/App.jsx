import React, { useState, useEffect } from "react";
import Filter from "./component/Filter";
import Notification from "./component/Notification";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import { GetInicialPersons } from "./services/phonebook.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({});
  const notification = (message, error = false) => {
    setMessage({
      message: message,
      error: error,
    });
    setTimeout(() => {
      setMessage({});
    }, 2000);
  };
  useEffect(() => {
    GetInicialPersons().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} error={message.error} />
      <Filter setFilter={setFilter} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        notification={notification}
      />
      <h2>Numbers</h2>
      {persons.length ? (
        <Persons
          filter={filter}
          persons={persons}
          setPersons={setPersons}
          notification={notification}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
