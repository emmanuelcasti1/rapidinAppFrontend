import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ URL del backend con el protocolo correcto
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
