import axios from "axios";

const ACCESS_TOKEN = 2553150254760804;

const q = axios.create({
  baseURL: `https://superheroapi.com/api.php/${ACCESS_TOKEN}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

const getData = res => {
  if (res.data != null && res.data.error != null) {
    throw new Error(res.data.error);
  }
  return res.data.results;
};

export function search_heros(query) {
  return q.get(`search/${query}`).then(getData);
}
