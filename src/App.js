import './App.css';
import React, { useState, useEffect } from "react";
import {Helmet} from 'react-helmet';
import SearchBar from "./components/searchBar.js";
import SearchResults from "./components/searchResults.js";
import Nominations from "./components/nominations.js";
import NoSearchResults from "./components/noSearchResults.js";
import NoNominations from "./components/noNominations.js";
import API from "./utils/API";
import DoneNominating from "./components/doneNominating.js";

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

  const [completeState, setCompleteState] = useState(false);

  useEffect(function() {
    fetchStored();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchStored (){
    let movieList = [];
    let nominationList = [];

    console.log("grabbing stored data");

    // movieList = [{id: "1", title: "Inception", year: "2010", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}, {id: "2", title: "Inception", year: "2011", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}, {id: "3", title: "The Italian Job", year: "2003", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg", nominated: false}, {id: "4", title: "Inception", year: "2013", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}, {id: "5", title: "The Italian Job", year: "2004", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg", nominated: false}, {id: "6", title: "The Italian Job", year: "2005", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg", nominated: false}];
    

    // nominationList = [{id: "3", title: "The Italian Job", year: "2003", poster: "https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg"}, {id: "4", title: "Inception", year: "2013", poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", nominated: false}];

    // for(let i = 0; i < movieList.length; i++){
    //   for (let j = 0; j < nominationList.length; j++){
    //     if(movieList[i].id === nominationList[j].id){
    //       movieList[i].nominated = true;
    //     }
    //   }
    // }

    // setNominationState({nominations: nominationList});
    // setSearchState({searchResults: movieList});
  }

  function removeNomination (idRemoved){
    console.log("hi");
    console.log(idRemoved);
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
    }
  }

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
          if(nominationState.nominations.length === 5){
            console.log("thank you");
            setCompleteState(true);
          }
        }
      }

    }
    else{
      console.log("nomination limit reached");
    }
  }

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

  function handleSearchInputChange(event){
    const value = event.target.value;
    const name = event.target.name;
    setSearchState({...searchState, [name]: value});
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
      
      <h2 style={{textAlign: "center"}}>The Shoppies</h2>
      <SearchBar searchMovies={searchMovies} handleSearchInputChange={handleSearchInputChange} searchState={searchState}/>
      <br />
      <div className="row">

        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box" style={{textAlign: "center"}}>
          <h3 className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Search Results </h3>
          {searchState.searchResults.length > 0
            ? searchState.searchResults.map(function(searchArray){
              return <SearchResults searchResults={searchArray} key={searchArray.id} addNomination={addNomination} />})
            : <NoSearchResults />
          }
        </div>
        <div className="col-2"></div>
          
        <div className="col-xl-5 col-lg-12 border border-info rounded-top rounded-bottom display-box" style={{textAlign: "center"}}>
        <h3 className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Nominations <span style={{fontSize: "15px"}}>({nominationState.nominations.length}/5)</span></h3>
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
