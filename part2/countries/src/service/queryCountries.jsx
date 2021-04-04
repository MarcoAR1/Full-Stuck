import axios from "axios";

export const getAllCountries = async () => {
  try {
    const data = await axios.get("https://restcountries.eu/rest/v2/all");

    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTimeCountrie = async (query) => {
  try {
    const data = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
