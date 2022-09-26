import axios from "axios";

// const API_URL = "https://productivity-idle-server.herokuapp.com/"
const API_URL = "http://localhost:7878"

export const getSave = () => {
  return axios.get(`${API_URL}`);
}