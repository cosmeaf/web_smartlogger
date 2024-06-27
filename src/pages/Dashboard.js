import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import api from "../services/api";
import "../components/css/Dashboard.css";

const Dashboard = () => {
  const [totalDevices, setTotalDevices] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalDevices = async () => {
      try {
        const response = await api.get("/devices/");
        setTotalDevices(response.length);
      } catch (error) {
        console.error("Failed to fetch total devices", error);
      }
    };
    fetchTotalDevices();
  }, []);

  const cards = [
    {
      icon: "fa-tractor",
      name: "Total Devices",
      value: totalDevices,
      onClick: () => navigate("devices"),
    },
    {
      icon: "fa-bell",
      name: "Alerta",
      value: "10",
      onClick: () => navigate("alerts"),
    },
    {
      icon: "fa-tools",
      name: "Serviços",
      value: "5",
      onClick: () => navigate("services"),
    },
    {
      icon: "fa-chart-bar",
      name: "Gráfico",
      value: "20",
      onClick: () => navigate("charts"),
    },
  ];

  return (
    <div className="dashboard-page">
      <HeaderLoggedIn />
      <Container className="my-5">
        <Row>
          {cards.map((card, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card className="h-100 clickable-card" onClick={card.onClick}>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <i className={`fas ${card.icon} fa-2x mb-3`}></i>
                  <h5 className="card-title">{card.name}</h5>
                  <p className="card-text">{card.value}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
