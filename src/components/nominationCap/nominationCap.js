import { Button, Modal } from 'react-bootstrap';
import React from "react";
import "./nominationCap.css"

function NominationCap(props) {
    function handleClose(){
        props.setErrorState(false);
    }

    return (
        <Modal show={props.errorState} onHide={handleClose} className="center-text" centered>
          <Modal.Body className="bg-danger error-message">
              You already have five nominations!
              <br />
              <br />
              <Button variant="dark" onClick={handleClose}>
                Close
            </Button>
          </Modal.Body>
        </Modal>
    );
}

export default NominationCap;