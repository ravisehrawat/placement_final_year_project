import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

const fetchData = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export default fetchData;
