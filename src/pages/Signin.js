import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  InputGroup,
} from "react-bootstrap";
import useAuth from "../context/UseAuth";
import LoadPage from "../components/LoadPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "../components/css/Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("cosmeaf@gmail.com");
  const [password, setPassword] = useState("qweasd32");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(username, password);
    } catch (err) {
      const errorMessage =
        err.message || "Failed to log in. Please check your credentials.";
      setError(errorMessage);
      console.error("Sign in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center min-vh-100">
      {loading && <LoadPage />}
      <Container>
        <Card className="p-4" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username" className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="E-mail"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
              <Button type="submit" className="w-100" size="sm">
                Sign In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/signup">Register</Link> |{" "}
              <Link to="/recovery">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;
