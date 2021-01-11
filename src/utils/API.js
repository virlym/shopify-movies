import axios from "axios";

const API = {
  search: function(title) {
    return axios.get(`https://www.omdbapi.com/?s=${title}&apikey=${process.env.REACT_APP_MOVIE_KEY}`);
  }
};

export default API;