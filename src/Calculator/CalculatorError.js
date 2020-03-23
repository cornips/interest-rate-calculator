import React, { Component } from "react";

class CalculatorError extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Set error state
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Er ging iets mis.</p>;
    }

    return this.props.children;
  }
}

export default CalculatorError;
