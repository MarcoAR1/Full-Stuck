import React from "react";
import { DeletePersons } from "../services/phonebook";

const Persons = ({ persons, filter, setPersons, notification }) => {
  const handleDeletePerson = (person_id, name) => {
    window.confirm(`Are you sure?\n you want delete to ${name}?`)
      ? DeletePersons(person_id)
          .then(() => {
            notification(`Successful delete ${name}.`);
            setPersons((prevPersons) => {
              return [...prevPersons].filter(({ id }) => id !== person_id);
            });
          })
          .catch(() => {
            notification(`${name} has been previously deleted.`, true);
          })
      : alert("Ok, don`t delete");
  };

  return (
    <>
      {persons
        .filter(({ name }) => RegExp(`^${filter}`, "i").test(name))
        .map(({ name, number, id }) => {
          return (
            <p key={id}>
              {name} {number}
              <button onClick={() => handleDeletePerson(id, name)}>
                delete
              </button>
            </p>
          );
        })}
    </>
  );
};

export default Persons;
