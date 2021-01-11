import React from "react";

function Nominations(props) {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.nominations.poster} alt={props.nominations.title + "Poster"} style={{ width: "130px" }} />
                </div>
                <div className="col-8">
                    <div className="row" style={{ paddingTop: "20px" }}>
                        <div className="col-12">
                            <p> {props.nominations.title} ({props.nominations.year})</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-12">
                            <button onClick={function(){props.removeNomination(props.nominations.id)}}> Remove </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ border: "1px solid slategrey" }} />
        </div>
    );
}

export default Nominations;