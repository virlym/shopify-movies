import './App.css';
import React, { useState, useEffect } from "react";
import {Helmet} from 'react-helmet';
import SearchBar from "./components/searchBar/searchBar.js";
import SearchResults from "./components/searchResults/searchResults.js";
import Nominations from "./components/nominations/nominations.js";
import NoSearchResults from "./components/noSearchResults.js";
import NoNominations from "./components/noNominations.js";
import API from "./utils/API";
import DoneNominating from "./components/doneNominating/doneNominating.js";
import NominationCap from "./components/nominationCap/nominationCap.js";

function App() {
  // search field and results
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchResults: []
    // {id, title, year, poster, nominated (T/F)}
  });

  // user nominations
  const [nominationState, setNominationState] = useState({
    nominations: []
    // {id, title, year, poster}
  });

  // nomination complete message
  const [completeState, setCompleteState] = useState(false);
  // nomination limit reached message
  const [errorState, setErrorState] = useState(false);

  useEffect(function() {
    fetchStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get stored nominations if present
  function fetchStored (){
    let savedList = getSavedNominations();
    if(savedList){
      setNominationState({nominations: savedList});
    }
  }

  // remove nomination from user list and update saved nominations
  function removeNomination (idRemoved){
    let index;
    for(var i = 0; i < nominationState.nominations.length; i += 1) {
      if(nominationState.nominations[i].id === idRemoved) {
          index = i;
      }
    }
    if(index >= 0){
      for(let i = 0; i < searchState.searchResults.length; i++){
        if(searchState.searchResults[i].id === idRemoved){
          let newSearchState = searchState.searchResults;
          newSearchState[i].nominated = false;
          setSearchState({...searchState, searchResults: newSearchState})
        }
      }
      console.log(index);
      let newNominations = nominationState.nominations;
      newNominations.splice(index, 1);
      setNominationState({nominations: newNominations});
      saveNominations();
    }
  }

  // add nomination to user list and update saved nominations
  // show completion banner if it was the 5th nomination
  // show error banner if they try to add more than 5
  function addNomination (idNominated){
    if(nominationState.nominations.length < 5){
      for(let i = 0; i < searchState.searchResults.length; i++){
        if(searchState.searchResults[i].id === idNominated){
          let newSearchState = searchState.searchResults;
          newSearchState[i].nominated = true;
          let newNomination = {id: newSearchState[i].id, title: newSearchState[i].title, year: newSearchState[i].year, poster: newSearchState[i].poster};
          let updateNominations = nominationState.nominations;
          updateNominations.push(newNomination); 
          setSearchState({...searchState, searchResults: newSearchState});
          setNominationState({nominations: updateNominations});
          saveNominations();
          if(nominationState.nominations.length === 5){
            setCompleteState(true);
          }
        }
      }

    }
    else{
      setErrorState(true);
    }
  }

  // search API for movies with the specified word(s) in the title then update search results
  function searchMovies(event){
    event.preventDefault();
    API.search(searchState.searchTerm)
        .then(function (res){
          if(res.data.Response === "True"){
            console.log(res.data);
            let movieList = [];
            for(let i = 0; i < res.data.Search.length; i++){
              if(res.data.Search[i].Type === "movie"){
                let isNominated = false;
                for(let j = 0; j < nominationState.nominations.length; j++){
                  if(nominationState.nominations[j].id === res.data.Search[i].imdbID){
                    isNominated = true;
                  }
                }
                let imgLink = res.data.Search[i].Poster;
                if(imgLink === "N/A"){
                  imgLink = "https://123moviesfree.zone/no-poster.png"
                }
                movieList.push({id: res.data.Search[i].imdbID, title: res.data.Search[i].Title, year: res.data.Search[i].Year, poster: imgLink, nominated: isNominated});
              }
            }
            setSearchState({...searchState, searchResults: movieList});
          }
        })
        .catch(err => console.log("error :", err));
  }

  // track search field input
  function handleSearchInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({...searchState, [name]: value});
  }

  // save user nominations to local storage
  function saveNominations(){
    localStorage.clear();
    // if there's no nominations, don't bother saving
    if(nominationState.nominations.length === 0){
        return;
    }
    var storage = JSON.stringify(nominationState.nominations);
    localStorage.setItem("Shoppies", storage);
  }

  // retrieve saved nominations if any
  function getSavedNominations(){
    if(JSON.parse(localStorage.getItem("Shoppies"))){
        if((JSON.parse(localStorage.getItem("Shoppies")).length !== 0)){
            return(JSON.parse(localStorage.getItem("Shoppies")));
        }
    }
    return "";
  }

  return (
    <div className = "container">
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>

      {completeState === true
        ? <DoneNominating completeState={completeState} setCompleteState={setCompleteState} />
        : null
      }
      {errorState === true
        ? <NominationCap errorState={errorState} setErrorState={setErrorState} />
        : null
      }
      <h2>The Shoppies</h2>
      <SearchBar searchMovies={searchMovies} handleSearchInputChange={handleSearchInputChange} searchState={searchState}/>
      <br />
      <div className="row">

        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box">
          <h3 className="bg-dark section-head"> Search Results </h3>
          {searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <SearchResults searchResults={searchArray} key={searchArray.id} addNomination={addNomination} />})
            : <NoSearchResults />
          }
        </div>
        <div className="col-2"></div>
          
        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box">
        <h3 className="bg-dark section-head"> Nominations <span>({nominationState.nominations.length}/5)</span></h3>
        {nominationState.nominations.length > 0
            ? nominationState.nominations.map(function(nominationArray){
              return <Nominations nominations={nominationArray} key={nominationArray.id} removeNomination={removeNomination} />})
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
