import axios from "axios";
import { API_URL } from "@/constant/CommonConst";
import authHeader from "../auth/auth-header";

const API_URL_USER  = API_URL +  "test/";

export const getPublicContent = () => {
  return axios.get(API_URL_USER + "all");
};

export const getUserBoard = () => {
  return axios.get(API_URL_USER + "user", { headers: authHeader() });
};

export const getModeratorBoard = () => {
  return axios.get(API_URL_USER + "mod", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL_USER + "admin", { headers: authHeader() });
};