import React from "react";
import "./searchResults.css";

function SearchResults(props) {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.searchResults.poster} alt={props.searchResults.title + "Poster"} className="poster-size"/>
                </div>
                <div className="col-8">
                    <div className="row description-row">
                        <div className="col-12">
                            <p> {props.searchResults.title} ({props.searchResults.year})</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            {props.searchResults.nominated === false
                                ? <button onClick={function(){props.addNomination(props.searchResults.id)}}> Nominate </button>
                                : <button disabled> Nominated </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <hr className="slate-hr"/>
        </div>

    );
}

export default SearchResults;