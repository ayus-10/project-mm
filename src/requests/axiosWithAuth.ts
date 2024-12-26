import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

export const axiosWithAuth = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
});
