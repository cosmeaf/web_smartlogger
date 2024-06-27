// src/pages/Devices.js
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import EquipamentModal from "../components/EquipamentModal";
import api from "../services/api";
import "../components/css/Devices.css";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const calculateHoursWorked = (horimeter, initialHour, azHoraSuntech) => {
    return (
      parseFloat(horimeter) +
      parseFloat(initialHour) -
      parseFloat(azHoraSuntech)
    ).toFixed(3);
  };

  const handleSave = async (newEquipment) => {
    try {
      await api.post("/equipment/", newEquipment);
      const updatedDevices = await api.get("/devices/");
      setDevices(updatedDevices);
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add equipment", error);
    }
  };

  return (
    <div className="devices-page">
      <HeaderLoggedIn />
      <Container fluid className="my-5">
        <Row>
          <Col md={6} className="text-left">
            <h1 className="mt-4">Lista dos Horímetros</h1>
          </Col>
          <Col md={6} className="text-right">
            <p className="mt-4">Registros Encontrados: {devices.length}</p>
            <Button
              variant="primary"
              className="button-small"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus"></i>
            </Button>
          </Col>
        </Row>
        <div className="table-responsive margin-bottom">
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>Id do Equipamento</th>
                <th>Nome da Máquina</th>
                <th>Modelo</th>
                <th>Área de Trabalho</th>
                <th>Operador</th>
                <th>Horímetro</th>
                <th>Velocidade de Pico (Km/h)</th>
                <th>Temperatura de Pico (°C)</th>
                <th>Impacto Pico</th>
                <th>Horas Restantes</th>
                <th>Horas Trabalhadas</th>
                <th>Atualizado</th>
                <th>Manutenção</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr
                  key={index}
                  className={device.in_maintenance ? "table-warning" : ""}
                >
                  <td>{device.device_id}</td>
                  <td>{device.name}</td>
                  <td>{device.model_brand}</td>
                  <td>{device.area_work}</td>
                  <td>{device.RFID}</td>
                  <td>{device.horimeter}</td>
                  <td>{device.velocidade_pico}</td>
                  <td>{device.temperatura_pico}</td>
                  <td>{device.impacto_pico}</td>
                  <td>{device.horas_restantes}</td>
                  <td>
                    {calculateHoursWorked(
                      device.horimeter,
                      device.initial_hour,
                      device.az_hora_suntech
                    )}
                  </td>
                  <td>
                    {format(new Date(device.updated_at), "HH:mm:ss dd/MM/yyyy")}
                  </td>
                  <td>
                    {device.in_maintenance ? (
                      <span className="text-danger">
                        <i className="fas fa-tools"></i> Em Manutenção
                      </span>
                    ) : (
                      <span className="text-success">
                        <i className="fas fa-check"></i> OK
                      </span>
                    )}
                  </td>
                  <td>
                    <Button variant="info" size="sm" className="button-small">
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="button-small"
                    >
                      <i className="fas fa-info-circle"></i>
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="button-small"
                      title="Gerenciar Manutenção"
                    >
                      <i className="fas fa-tools"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <EquipamentModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Devices;
