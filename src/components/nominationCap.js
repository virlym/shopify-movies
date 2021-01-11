import { Button, Modal } from 'react-bootstrap';
import React from "react";

function NominationCap(props) {
    function handleClose(){
        props.setErrorState(false);
    }

    return (
        <Modal show={props.errorState} onHide={handleClose} style={{textAlign: "center"}} centered>
          <Modal.Body className="bg-danger" style={{fontSize: "25px"}}>
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