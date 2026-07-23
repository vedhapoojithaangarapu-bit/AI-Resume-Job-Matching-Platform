import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.MODE === "production" ? "https://ai-resume-job-matching-platform.onrender.com" : "http://127.0.0.1:8000"),
});

export default API;
