import React, { Component } from "react";
import config from "../config";
import { validateConfig } from "../helpers";
import { CalculatorSelect, CalculatorInput } from "./Fields";
import CalculatorOutput from "./CalculatorOutput";
import CalculatorError from "./CalculatorError";

import { ReactComponent as EuroSymbol } from "./assets/euro.svg";
import { Title, Card } from "../Style/layout";

class Calculator extends Component {
  constructor(props) {
    super(props);

    // Validate config
    validateConfig(
      "maxLoanDuration",
      "allDurationOptions",
      "locale.thousandsSeparator"
    );

    // Initial values
    this.state = {
      product: "marketing",
      legal_form: "bv",
      duration: 3,
      maxLoan: {
        amount: 250e3,
        duration: 36
      }
    };
  }

  // Callback function to allow input to be saved in state
  saveInputToState = (event, numeric = false) => {
    event.persist();

    let { name, value } = event.target;

    // Filter for decimals if requested
    const numericValue = parseInt(value.replace(/\D/g, ""));
    // eslint-disable-next-line
    if (numeric || value == numericValue)
      value = parseInt(value.replace(/\D/g, "")); //replace is faster then match+join https://jsben.ch/YPVJe

    this.setState({ [name]: value }, this.saveMaxLoanToState);

    return null;
  };

  // Function to allow max loan to be saved in state
  saveMaxLoanToState = () => {
    const { product = null, legal_form = null } = this.state;
    if (!product || !legal_form) return null;

    const maxLoan = this.calculateMaxLoan(product, legal_form);
    this.setState({ maxLoan: maxLoan });

    return null;
  };

  // Function to calculate max loan based on input
  calculateMaxLoan = (product, legalForm) => {
    let loan = { amount: null, duration: null };
    if (product === "marketing") {
      loan.amount = 250e3;
      loan.duration = config.maxLoanDuration.marketing;
    } else if (product === "equipment") {
      loan.amount = legalForm === "bv" ? 500e3 : 250e3;
      loan.duration = config.maxLoanDuration.equipment;
    }
    return loan;
  };

  // Function to show/hide specific loan durations
  renderMaxDuration = maxDuration => {
    const durationOptions = {};

    for (const duration of config.allDurationOptions) {
      // push duration when lower or equal to maxDuration
      if (duration <= maxDuration)
        durationOptions[duration] = `${duration} maanden`;
    }

    return durationOptions;
  };

  // Sanitize input for requested amount
  // Returns sanitized input
  sanitizeInputAmount = requestedAmount => {
    // Filter non-numeric characters
    requestedAmount = requestedAmount.replace(/\D/g, "");

    // Save integer for math
    const requestedAmountInt = parseInt(requestedAmount);

    // Add thousands separator
    requestedAmount = requestedAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, config.locale.thousandsSeparator);

    return {
      decimal: requestedAmountInt,
      print: requestedAmount
    };
  };

  // Callback function to sanitize and save requested amount
  saveAmountToState = event => {
    event.persist();

    event.target.value = this.sanitizeInputAmount(event.target.value).print;

    return this.saveInputToState(event, true);
  };

  validateInputAmount = (event, rules) => {
    event.persist();

    // Filter non-numeric characters and parse integer for math
    const requestedAmountInt = parseInt(event.target.value.replace(/\D/g, ""));

    // Set amount to min or max based on rules
    if (rules.min && requestedAmountInt < rules.min)
      event.target.value = this.sanitizeInputAmount(rules.min.toString()).print;
    if (rules.max && requestedAmountInt > rules.max)
      event.target.value = this.sanitizeInputAmount(rules.max.toString()).print;
  };

  render() {
    const { maxLoan } = this.state;
    return (
      <div>
        <Card>
          <Title>Ontdek jouw mogelijkheden</Title>
          <form>
            <CalculatorSelect
              name="product"
              label="Financieringsdoel"
              options={{
                marketing: "Marketing",
                equipment: "Equipment"
              }}
              attributes={{
                large: true
              }}
              callback={this.saveInputToState}
            />

            <CalculatorInput
              name="requested_amount"
              label="Bedrag"
              type="text"
              attributes={{
                min: 5e3,
                max: maxLoan.amount,
                placeholder: `van €5K tot €${maxLoan.amount / 1e3}K`,
                pattern: "d*", // eslint-disable-line
                large: true,
                onBlur: event =>
                  this.validateInputAmount(event, {
                    min: 5e3,
                    max: maxLoan.amount
                  })
              }}
              icon={<EuroSymbol />}
              callback={this.saveAmountToState}
            />

            <CalculatorSelect
              name="legal_form"
              label="Rechtsvorm"
              options={{
                bv: "BV",
                eenmanszaak: "Eenmanszaak"
              }}
              attributes={{
                large: true
              }}
              callback={this.saveInputToState}
            />

            <CalculatorSelect
              name="duration"
              label="Looptijd"
              options={this.renderMaxDuration(maxLoan.duration)}
              attributes={{
                large: true
              }}
              callback={this.saveInputToState}
            />
          </form>
        </Card>

        <CalculatorError>
          <CalculatorOutput input={this.state} />
        </CalculatorError>
      </div>
    );
  }
}

export default Calculator;
