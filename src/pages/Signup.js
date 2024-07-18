import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import LoadPage from "../components/LoadPage";
import api from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../components/css/Signin.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        repeat_password: repeatPassword,
      };

      const response = await api.post("/register/", data);

      if (response.code && response.code !== 200) {
        const errorMessage = Object.values(response.message).flat().join(", ");
        setError(errorMessage);
      } else {
        setSuccess("Registration successful!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
      }
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center min-vh-100">
      {loading && <LoadPage />}
      <Container>
        <Card className="p-4" style={{ maxWidth: "500px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group id="firstName" className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        size="sm"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group id="lastName" className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        size="sm"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group id="email" className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="sm"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="sm"
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group id="repeatPassword" className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faRedoAlt} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Repeat Password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    size="sm"
                  />
                </InputGroup>
              </Form.Group>
              <Button type="submit" className="w-100" size="sm">
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
            <div className="w-100 text-center mt-3">
              <Link to="/recovery">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
