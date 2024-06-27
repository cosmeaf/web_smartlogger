import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./css/LogoutModal.css";

const LogoutModal = ({ show, onHide, logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to sign out?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Sign Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
