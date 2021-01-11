import { Button, Modal } from 'react-bootstrap';
import React from "react";

function DoneNominating(props) {
    function handleClose(){
        props.setCompleteState(false);
    }

    return (
        <Modal show={props.completeState} onHide={handleClose} style={{textAlign: "center"}} centered>
          <Modal.Body className="bg-success" style={{fontSize: "25px"}}>
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