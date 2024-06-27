import React, { Component } from "react";
import "./css/ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container d-flex flex-column align-items-center justify-content-center">
          <div className="card p-4">
            <h1 className="card-title">Something went wrong.</h1>
            <p className="card-text">
              We're sorry, an unexpected error has occurred.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
