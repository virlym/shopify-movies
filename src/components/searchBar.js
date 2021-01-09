import React from "react";

function SearchBar() {
    return (

        <div className="row">
            <div className="col-12">
                <div className="input-group input-group-lg" style={{ marginTop: "20px", textAlign: "center" }}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-lg">Search</span>
                    </div>
                    <input
                        className="form-control"
                        id="movieSearch"
                        // value={this.state.searchTerm}
                        name="searchTerm"
                        // onChange={this.handleInputChange.bind(this)}
                        type="text"
                        placeholder="Movie Title"
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;