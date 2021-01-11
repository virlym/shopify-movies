import React from "react";
import "./nominations.css";

function Nominations(props) {
    return (
        <div>
            <div className="row">
                <div className="col-4">
                    <img src={props.nominations.poster} alt={props.nominations.title + "Poster"} className="poster-size" />
                </div>
                <div className="col-8">
                    <div className="row description-row">
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
            <hr className="slate-hr"/>
        </div>
    );
}

export default Nominations;