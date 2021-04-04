import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
export const GetInicialPersons = async () => {
  const data = await axios.get(baseUrl);
  return data.data;
};

export const CreateNewPersons = async (data) => {
  const request = await axios.post(baseUrl, data);
  return request;
};

export const DeletePersons = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};

export const UpdatePersons = async (id, data) => {
  const request = await axios.put(`${baseUrl}/${id}`, data);
  return request;
};
