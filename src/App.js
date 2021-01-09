import './App.css';
import {Helmet} from 'react-helmet';
import SearchBar from "./components/searchBar.js";

function App() {
  return (
    <div className = "container">
      <Helmet>
        <body className="bg-dark text-light"/>
      </Helmet>

      <SearchBar />
      
      <footer>
        <small> &copy; 2020 Virlym di Aunel</small>
      </footer>
    </div>
  );
}

export default App;
