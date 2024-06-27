import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LoadPage from "../components/LoadPage";
import "../components/css/Signin.css";

const Signin = () => {
  const [username, setUsername] = useState("cosme.alex@gmail.com");
  const [password, setPassword] = useState("qweasd32");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser({ username, password });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page d-flex align-items-center justify-content-center min-vh-100">
      {loading && <LoadPage />}
      <Container>
        <Card className="p-4">
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="w-100">
                Sign In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/register">Register</Link> |{" "}
              <Link to="/recovery">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;
