import React, { useState } from "react";
import { CreateNewPersons, UpdatePersons } from "../services/phonebook";

const PersonForm = ({ persons, setPersons, notification }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSumit = (event) => {
    event.preventDefault();
    if (newName && newNumber) {
      const contact = {
        name: newName.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
        number: newNumber,
      };
      const find = persons.find(
        ({ name }) => name.toLowerCase() === newName.toLowerCase()
      );
      find
        ? replaceContact(find.id, contact)
        : CreateNewPersons(contact)
            .then((data) => {
              setPersons((prevPersons) => {
                return [...prevPersons, data.data];
              });
              notification(`Added ${data.data.name}`);
            })
            .catch(() => {
              notification(
                `We could not create the contact ${newName} try again.`,
                true
              );
            });
      setNewName("");
      setNewNumber("");
    } else {
      newName
        ? alert("Please, fill in the missing field number.")
        : alert("Please, fill in the missing field name.");
    }
  };

  const replaceContact = (contact_id, contact) => {
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
      ? UpdatePersons(contact_id, contact)
          .then((res) => {
            const { data } = res;
            setPersons((prevPersons) => {
              return [...prevPersons]
                .filter(({ id }) => {
                  return id !== data.id;
                })
                .concat(data);
            });
            notification(`Information of ${newName} has replace successful`);
          })
          .catch(() => {
            notification(
              `Information of ${newName} has already been removed from server`,
              true
            );
          })
      : alert("Ok,Don`t update contact.");
  };

  return (
    <form onSubmit={handleSumit}>
      <div>
        name:
        <input
          onChange={handleChangeName}
          value={newName}
          pattern="^[A-Za-z\s0-9_-]+$"
          title="Only number, _- and letter."
        />
      </div>
      <div>
        number:
        <input
          onChange={handleChangeNumber}
          value={newNumber}
          pattern="^[0-9+\s_-]+$"
          title="Only  _- and number."
        />
      </div>
      <div>
        <button>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
