import { Button, Modal } from 'react-bootstrap';
import React from "react";
import "./doneNominating.css";

function DoneNominating(props) {
    function handleClose(){
        props.setCompleteState(false);
    }

    return (
        <Modal show={props.completeState} onHide={handleClose} centered className="center-text">
          <Modal.Body className="bg-success success-message">
              Thank you for nominating five movies!
              <br />
              <br />
              <Button variant="dark" onClick={handleClose}>
                Close
            </Button>
          </Modal.Body>
        </Modal>
    );
}

export default DoneNominating;