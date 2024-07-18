import React from "react";
import Header from "../components/HeaderNotLoggedIn";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import "../components/css/Home.css";

const Home = () => {
  return (
    <div className="home d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <Container className="my-5">
          <h1 className="text-center">Welcome to MyApp</h1>
          <p className="text-center">
            Your go-to app for awesome features and more!
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
