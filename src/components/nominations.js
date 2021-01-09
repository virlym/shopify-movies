import React from "react";

function Nominations() {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src="https://m.media-amazon.com/images/M/MV5BNDYyNzYxNjYtNmYzMC00MTE0LWIwMmYtNTAyZDBjYTIxMTRhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg" alt="inceptionPoster" style={{width: "130px"}}/>
                </div>
                <div className="col-1"></div>
                <div className="col-7">
                    <div className="row" style={{paddingTop: "20px"}}>
                        <div className="col-12">
                            <p> The Italian Job (2003)</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            <button> Remove </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{border: "1px solid slategrey" }} />
        </div>
    );
}

export default Nominations;