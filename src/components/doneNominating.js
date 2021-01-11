import { Button, Modal } from 'react-bootstrap';
import React from "react";

function SearchBar(props) {
    function handleClose(){
        props.setCompleteState(false);
    }

    return (
        <Modal show={props.completeState} onHide={handleClose} className="text-dark">
          <Modal.Header closeButton>
            <Modal.Title>The Shoppies</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thank you for nominating five movies!</Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

export default SearchBar;