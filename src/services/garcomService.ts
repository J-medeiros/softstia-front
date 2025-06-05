import axios from "axios";

const API_URL = "https://sofistia-back-end.onrender.com/api/crud-garcom.php";

export const chamarGarcomApi = (mesa: string | number) => {
  return axios.post(API_URL, {
    mesa: Number(mesa),
    status: "pendente"
  });
};