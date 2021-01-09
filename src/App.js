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
      <div className="row">
        <SearchResults />
        <Nominations />
      </div>
      
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
