import './App.css';
import {Helmet} from 'react-helmet';
import SearchBar from "./components/searchBar.js";
import SearchResults from "./components/searchResults.js";
import Nominations from "./components/nominations.js";

function App() {
  return (
    <div className = "container">
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>

      <SearchBar />
      <br />
      <div className="row">

        <div className="col-xl-5 col-l-12 border border-info rounded-top rounded-bottom display-box">
          <p className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Search Results </p>
          <SearchResults />
        </div>
        <div className="col-2"></div>
          
        <div className="col-xl-5 col-l-12 border border-info rounded-top rounded-bottom display-box">
        <p className="bg-dark" style={{position: "sticky", top: "0", width: "100%", zIndex: "1"}}> Nominations </p>
          <Nominations />
        </div>

      </div>
      
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
