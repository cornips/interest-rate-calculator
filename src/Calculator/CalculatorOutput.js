import React, { Component } from "react";
import config from "../config";
import { validateObject, validateConfig } from "../helpers";
import { Title, ReceiptWrapper, Receipt } from "../Style/layout";

class CalculatorOutput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      rate: null
    };

    // Validate config
    validateConfig("maxLoanDuration", "interestRates", "interestRateRounding");
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const shouldOpen = Boolean(nextProps.input.requested_amount);

    this.setState({
      // Open or close based on input
      open: shouldOpen,
      // Add calculated interest rate to state
      rate: shouldOpen
        ? this.calculateInterest(nextProps.input)
        : this.state.rate
    });
  };

  calculateInterest = input => {
    const expectedScheme = {
      product: "string",
      requested_amount: "number",
      duration: "number"
    };

    // Stop execution when input does not meet scheme
    if (!validateObject(input, expectedScheme)) return false;

    if (!input.requested_amount) return;

    // Decide the rate base to use
    let rateBase;
    for (let rate of Object.keys(config.interestRates)) {
      rate = parseInt(rate);
      // Use base rate if amount is smaller or equal than max amount (= key), or when the current rate is max rate
      if (
        rate >= input.requested_amount ||
        rate === Math.max(...Object.keys(config.interestRates))
      ) {
        rateBase = config.interestRates[rate];
        break;
      }
    }

    // Calculate the difference in lowest [0] and highest [1] rate
    const rateDifference = rateBase[1] - rateBase[0];
    // Set a duration base to the lowest duration option to use min and max interest rate
    const durationBase = 3;
    // Use minimum rate and add percentage of difference
    const rate =
      rateBase[0] +
      (rateDifference * (input.duration - durationBase)) /
        (config.maxLoanDuration[input.product] - durationBase);

    const round = Number(`1e+${config.interestRateRounding}`);
    return Math.round(rate * round) / round;
  };

  render() {
    const { open, rate } = this.state;

    return (
      <ReceiptWrapper>
        <Receipt className={open ? "open" : ""}>
          <Title as="h3">Rente</Title>
          <p>
            We bieden een rentepercentage van <strong>{rate}%</strong>
          </p>
        </Receipt>
      </ReceiptWrapper>
    );
  }
}

export default CalculatorOutput;
