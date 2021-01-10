import React from "react";

function SearchResults(props) {
    console.log(props);
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.searchResults.poster} alt={props.searchResults.title + "Poster"} style={{ width: "130px" }} />
                </div>
                <div className="col-8">
                    <div className="row" style={{ paddingTop: "20px" }}>
                        <div className="col-12">
                            <p> {props.searchResults.title} ({props.searchResults.year})</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            {props.searchResults.nominated === false
                                ? <button> Nominate </button>
                                : <button disabled> Nominated </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ border: "1px solid slategrey" }} />
        </div>

    );
}

export default SearchResults;