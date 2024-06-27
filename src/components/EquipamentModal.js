// src/components/EquipamentModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";

const EquipamentModal = ({ show, handleClose, handleSave }) => {
  const [devices, setDevices] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    device_id: "",
    initial_hour: 0,
    az_hora_suntech: 0,
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get("/devices/");
        setDevices(response);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      }
    };
    fetchDevices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(newEquipment);
    setNewEquipment({
      device_id: "",
      initial_hour: 0,
      az_hora_suntech: 0,
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Equipamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="device_id">
            <Form.Label>Id do Equipamento</Form.Label>
            <Form.Control
              as="select"
              name="device_id"
              value={newEquipment.device_id}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um dispositivo</option>
              {devices.map((device) => (
                <option key={device.device_id} value={device.device_id}>
                  {device.device_id} - {device.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="initial_hour">
            <Form.Label>Hora Inicial</Form.Label>
            <Form.Control
              type="number"
              name="initial_hour"
              value={newEquipment.initial_hour}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="az_hora_suntech">
            <Form.Label>Ajuste de Zero Hora Suntech</Form.Label>
            <Form.Control
              type="number"
              name="az_hora_suntech"
              value={newEquipment.az_hora_suntech}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 button-small">
            Salvar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EquipamentModal;
