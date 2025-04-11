import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/all";

export const axiosCountries = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (err) {
    console.error(
      "Error axios countries",
      err.response?.status,
      err.response?.data || err.message,
    );
    throw new Error("Failed to fetch countries");
  }
};
