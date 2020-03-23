import React, { Component } from "react";
import { validateObject, validateConfig } from "../helpers";
import config from "../config";

class CalculatorOutput extends Component {
  constructor(props) {
    super(props);

    // Validate config
    validateConfig("maxLoanDuration", "interestRates", "interestRateRounding");
  }

  calculateInterest = input => {
    const expectedScheme = {
      product: "string",
      requested_amount: "number",
      duration: "number"
    };

    // Stop execution when input does not meet scheme
    if (!validateObject(input, expectedScheme)) return false;

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
    const { input } = this.props;

    // Don't show when no interest rate is available
    if (!input.requested_amount) return null;

    // example input
    // input = {
    //   product: "marketing",
    //   legal_form: "bv",
    //   maxLoan: {
    //     amount: 250e3,
    //     duration: 36
    //   },
    //   requested_amount: 3357
    // };

    return (
      <div className="calculator-output">
        <h3>Rente</h3>
        <p className="interest-rate">
          We bieden een rentepercentage van{" "}
          <strong>{this.calculateInterest(input)}%</strong>
        </p>
      </div>
    );
  }
}

export default CalculatorOutput;
