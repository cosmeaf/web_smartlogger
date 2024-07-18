import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import api from "../services/api";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import "../components/css/EquipamentCreator.css";

const EquipamentCreator = () => {
  const [devices, setDevices] = useState([]);
  const [formData, setFormData] = useState({
    device: "",
    horimetro_inicialMaquina: 0,
    nome: "",
    numero_serie: "",
    ano: new Date().getFullYear(), // Define o ano atual como padrão
    modelo: "N/A",
    ponto_medicao: "N/A",
    combustivel: "DIESEL",
    numero_pulsos: 0,
    perimetro_pneu: 0.0,
    horas_disponiveis_mes: 0.0,
    consumo_medio: 0.0,
    alerta_velocidade: 0.0,
    alerta_temperatura: 0.0,
    alerta_shock: 0.0,
    horas_efetivas_hodometro: "HODOMETRO",
    hodometro: 0.0,
    obs: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/");
        setDevices(response);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      }
    };
    fetchDevices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/equipament/", formData);
      navigate("/dashboard/equipament");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error("Failed to create equipament", error);
      }
    }
  };

  return (
    <>
      <HeaderLoggedIn />
      <Container className="my-5">
        <h1 className="mb-4">Create New Equipament</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={3}>
              <Form.Group controlId="formDevice">
                <Form.Label>Device</Form.Label>
                <Form.Control
                  as="select"
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  isInvalid={!!errors.device}
                  required
                >
                  <option value="">Select a device</option>
                  {devices &&
                    devices.map((device) => (
                      <option key={device.device_id} value={device.device_id}>
                        {device.device_id}
                      </option>
                    ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.device}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  isInvalid={!!errors.nome}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formNumeroSerie">
                <Form.Label>Número de Série</Form.Label>
                <Form.Control
                  type="text"
                  name="numero_serie"
                  value={formData.numero_serie}
                  onChange={handleChange}
                  isInvalid={!!errors.numero_serie}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numero_serie}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formAno">
                <Form.Label>Ano</Form.Label>
                <Form.Control
                  type="number"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  isInvalid={!!errors.ano}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ano}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formHorimetroInicialMaquina">
                <Form.Label>Horímetro Inicial Máquina</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="horimetro_inicialMaquina"
                  value={formData.horimetro_inicialMaquina}
                  onChange={handleChange}
                  isInvalid={!!errors.horimetro_inicialMaquina}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.horimetro_inicialMaquina}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* Campos opcionais */}
          <Row>
            <Col md={3}>
              <Form.Group controlId="formModelo">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formPontoMedicao">
                <Form.Label>Ponto de Medição</Form.Label>
                <Form.Control
                  type="text"
                  name="ponto_medicao"
                  value={formData.ponto_medicao}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formCombustivel">
                <Form.Label>Combustível</Form.Label>
                <Form.Control
                  as="select"
                  name="combustivel"
                  value={formData.combustivel}
                  onChange={handleChange}
                >
                  <option value="GS">GS</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="GASOLINA">Gasolina</option>
                  <option value="ELETRICA">Elétrica</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group controlId="formNumeroPulsos">
                <Form.Label>Número de Pulsos</Form.Label>
                <Form.Control
                  type="number"
                  name="numero_pulsos"
                  value={formData.numero_pulsos}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formPerimetroPneu">
                <Form.Label>Perímetro do Pneu (cm)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="perimetro_pneu"
                  value={formData.perimetro_pneu}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formHorasDisponiveisMes">
                <Form.Label>Horas Disponíveis por Mês</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="horas_disponiveis_mes"
                  value={formData.horas_disponiveis_mes}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group controlId="formConsumoMedio">
                <Form.Label>Consumo Médio (m³/h - L/h - Kg/h)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="consumo_medio"
                  value={formData.consumo_medio}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formAlertaVelocidade">
                <Form.Label>Alerta de Velocidade (km/h)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_velocidade"
                  value={formData.alerta_velocidade}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formAlertaTemperatura">
                <Form.Label>Alerta de Temperatura (°C)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_temperatura"
                  value={formData.alerta_temperatura}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formAlertaShock">
                <Form.Label>Alerta de Shock (km/h)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_shock"
                  value={formData.alerta_shock}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <Form.Group controlId="formHorasEfetivasHodometro">
                <Form.Label>Horas Efetivas ou Hodômetro</Form.Label>
                <Form.Control
                  as="select"
                  name="horas_efetivas_hodometro"
                  value={formData.horas_efetivas_hodometro}
                  onChange={handleChange}
                >
                  <option value="HODOMETRO">Hodômetro</option>
                  <option value="HORAS_EFETIVAS">Horas Efetivas</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="formHodometro">
                <Form.Label>Hodômetro</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="hodometro"
                  value={formData.hodometro}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formObs">
                <Form.Label>Observações</Form.Label>
                <Form.Control
                  as="textarea"
                  name="obs"
                  value={formData.obs}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Create Equipament
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EquipamentCreator;
