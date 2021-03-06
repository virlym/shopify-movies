import React from "react";
import "./searchBar.css";

function SearchBar(props) {
    return (

        <div className="row">
            <div className="col-12">
                <form onSubmit={props.searchMovies} className="input-group input-group-lg search-style">
                    <input type="submit" className="input-group-prepend input-group-text" value="Search" />
                    <input
                        className="form-control"
                        value={props.searchState.searchTerm || ""}
                        name="searchTerm"
                        onChange={props.handleSearchInputChange}
                        type="text"
                        placeholder="Movie Title"
                    />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;