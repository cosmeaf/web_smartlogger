import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import api from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faTractor,
  faFileAlt,
  faHistory,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import "../components/css/Dashboard.css";

const Dashboard = () => {
  const [totalDevices, setTotalDevices] = useState(0);
  const [totalEquipament, setTotalEquipament] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [totalHistoricalLogs, setTotalHistoricalLogs] = useState(0);
  const [totalGraphData, setTotalGraphData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await api.get("/device/");
        setTotalDevices(response.length);
      } catch (error) {
        console.error("Failed to fetch devices", error);
      }
    };
    fetchDevices();
  }, []);

  useEffect(() => {
    const fetchEquipament = async () => {
      try {
        const response = await api.get("/equipament/");
        setTotalEquipament(response.length);
      } catch (error) {
        console.error("Failed to fetch equipment", error);
      }
    };
    fetchEquipament();
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/reports/");
        setTotalReports(response.length);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  useEffect(() => {
    const fetchHistoricalLogs = async () => {
      try {
        const response = await api.get("/historical_logs/");
        setTotalHistoricalLogs(response.length);
      } catch (error) {
        console.error("Failed to fetch historical logs", error);
      }
    };
    fetchHistoricalLogs();
  }, []);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await api.get("/graph_data/");
        setTotalGraphData(response.length);
      } catch (error) {
        console.error("Failed to fetch graph data", error);
      }
    };
    fetchGraphData();
  }, []);

  const cards = [
    {
      icon: faTachometerAlt,
      name: "Total Dispositivos",
      value: totalDevices,
      onClick: () => navigate("/dashboard/devices"),
    },
    {
      icon: faTractor,
      name: "Total Equipamentos",
      value: totalEquipament,
      onClick: () => navigate("/dashboard/equipament"),
    },
    {
      icon: faFileAlt,
      name: "Reports",
      value: totalReports,
      onClick: () => navigate("/dashboard/reports"),
    },
    {
      icon: faHistory,
      name: "Historical Logs",
      value: totalHistoricalLogs,
      onClick: () => navigate("/dashboard/historical_logs"),
    },
    {
      icon: faChartBar,
      name: "Graph Data",
      value: totalGraphData,
      onClick: () => navigate("/dashboard/graph_data"),
    },
  ];

  return (
    <div className="dashboard-page">
      <HeaderLoggedIn />
      <Container className="my-5">
        <Row>
          {cards.map((card, index) => (
            <Col key={index} md={3} className="mb-4">
              <Card
                className="h-100 clickable-card"
                onClick={card.onClick}
                style={{ fontSize: "0.8rem" }}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <FontAwesomeIcon
                    icon={card.icon}
                    size="2x"
                    className="mb-3"
                  />
                  <h5
                    className="card-title text-center"
                    style={{ fontSize: "1rem" }}
                  >
                    {card.name}
                  </h5>
                  <p
                    className="card-text text-center"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {card.value}
                  </p>
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
