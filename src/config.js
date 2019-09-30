import axios from "axios";
import { getTokenFromLocalStorage } from "./actions/localStorage";

export const api = axios.create({
  baseURL: "https://redmine.ekreative.com/"
  /*     validateStatus: () => true,
       params: {
            key: getTokenFromLocalStorage()
        }*/
});
