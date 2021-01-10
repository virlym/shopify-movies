import './App.css';
import React, { useState, useEffect } from "react";
import {Helmet} from 'react-helmet';
import SearchBar from "./components/searchBar.js";
import SearchResults from "./components/searchResults.js";
import Nominations from "./components/nominations.js";
import NoSearchResults from "./components/noSearchResults.js";
import NoNominations from "./components/noNominations.js";

function App() {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchResults: []
    // {id, title, year, poster, nominated (T/F)}
  });

  const [nominationState, setNominationState] = useState({
    nominations: []
    // {id, title, year, poster}
  });

  useEffect(function() {
    fetchStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchStored (){
    let movieList = [];
    let nominationList = [];

    console.log("grabbing stored data");

    movieList = [{id: "1", title: "Inception", year: "2010", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}, {id: "2", title: "Inception", year: "2011", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}, {id: "3", title: "The Italian Job", year: "2003", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg", nominated: false}, {id: "4", title: "Inception", year: "2013", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}];
    

    nominationList = [{id: "3", title: "The Italian Job", year: "2003", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"}];

    for(let i = 0; i < movieList.length; i++){
      for (let j = 0; j < nominationList.length; j++){
        if(movieList[i].id === nominationList[j].id){
          movieList[i].nominated = true;
        }
      }
    }
    
    setNominationState({nominations: nominationList});
    setSearchState({searchResults: movieList});
  }

  return (
    <div className = "container">
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>

      <SearchBar />
      <br />
      <div className="row">

        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box" style={{textAlign: "center"}}>
          <h3 className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Search Results </h3>
          {searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <SearchResults searchResults={searchArray} key={searchArray.id} />})
            : <NoSearchResults />
          }
        </div>
        <div className="col-2"></div>
          
        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box" style={{textAlign: "center"}}>
        <h3 className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Nominations </h3>
        {nominationState.nominations.length > 0
            ? nominationState.nominations.map(function(nominationArray){
              return <Nominations nominations={nominationArray} key={nominationArray.id} />})
            : <NoNominations />
          }
        </div>

      </div>
      
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
