import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={3}>
            <h5>Política</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#privacy" className="text-white">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#lgpd" className="text-white">
                  LGPD
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Empresa</h5>
            <ul className="list-unstyled">
              <li>Nome da Empresa</li>
              <li>Telefone: (xx) xxxx-xxxx</li>
              <li>Email: contato@empresa.com</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Sites</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#site1" className="text-white">
                  Site da Empresa 1
                </a>
              </li>
              <li>
                <a href="#site2" className="text-white">
                  Site da Empresa 2
                </a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Institucional</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#about" className="text-white">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#careers" className="text-white">
                  Carreiras
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center mt-4">
          <Col>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Nome da Empresa. Todos os
              direitos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
