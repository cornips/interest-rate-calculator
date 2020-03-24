import React, { Component } from "react";
import styled from "styled-components";

const Error = styled.p`
  font-family: monospace;
`;

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
      return <Error>Er ging iets mis.</Error>;
    }

    return this.props.children;
  }
}

export default CalculatorError;
