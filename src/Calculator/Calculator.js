import React, { Component } from "react";
import config from "../config";
import { validateConfig, stringToInt, i18n } from "../helpers";
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
      "minLoan.amount",
      "maxLoan.default",
      "allDurationOptions",
      "locale"
    );

    // Initial values
    this.state = {
      product: "marketing",
      legal_form: "bv",
      duration: config.defaultDuration,
      requested_amount: "",
      maxLoan: {
        amount: 250e3,
        duration: 36
      }
    };

    this.requestedAmountInput = React.createRef();
  }

  // Callback function to allow input to be saved in state
  saveInputToState = (event, numeric = false) => {
    event.persist();

    let { name, value } = event.target;

    // Filter for decimals if requested
    const numericValue = stringToInt(value);

    // Treat as numeric when string is number
    // eslint-disable-next-line
    if (value == numericValue) numeric = true;

    // Set string value to numeric value when needed
    if (numeric) value = numericValue;

    // Empty value on unexpected value (e.g. NaN)
    if (!event.target.value) value = "";

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

    if (validateConfig(`maxLoan.${product}`)) {
      // Load max amount and duration of product from config
      loan.amount = config.maxLoan[product].amount[legalForm];
      loan.duration = config.maxLoan[product].duration;
    }

    return loan;
  };

  // Function to show/hide specific loan durations
  renderMaxDuration = maxDuration => {
    const durationOptions = {};

    for (const duration of config.allDurationOptions) {
      // push duration when lower or equal to maxDuration
      if (duration <= maxDuration)
        durationOptions[duration] = `${duration} ${i18n("months")}`;
    }

    return durationOptions;
  };

  // Sanitize input for requested amount
  // Returns sanitized input
  sanitizeInputAmount = requestedAmount => {
    // Filter non-numeric characters and save for math
    const requestedAmountInt = (requestedAmount = stringToInt(requestedAmount));

    // Return null when not a number
    if (!requestedAmount || isNaN(requestedAmount)) return;

    // Add thousands separator
    requestedAmount = requestedAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, i18n("_thousandsSeparator"));

    return {
      decimal: requestedAmountInt,
      print: requestedAmount
    };
  };

  // Callback function to sanitize and save requested amount
  saveAmountToState = event => {
    event.persist();
    const sanitizedValue = this.sanitizeInputAmount(event.target.value);

    if (sanitizedValue) event.target.value = sanitizedValue.print;

    return this.saveInputToState(event, true);
  };

  // Set requested amount to a valid value
  validateInputAmount = (event, rules) => {
    event.persist();

    event.target.value = this.validateAmount(event.target.value, rules);

    return this.saveInputToState(event, true);
  };

  // Validate a given amount against certain rules
  validateAmount = (amount, rules, minOnly = false) => {
    // Filter non-numeric characters and parse integer for math
    const requestedAmountInt = stringToInt(amount);

    // Set amount to min or max based on rules
    if (rules.min && requestedAmountInt < rules.min)
      amount = this.sanitizeInputAmount(rules.min.toString()).print;
    if (!minOnly && rules.max && requestedAmountInt > rules.max)
      amount = this.sanitizeInputAmount(rules.max.toString()).print;

    return amount;
  };

  render() {
    const { duration, maxLoan } = this.state;

    // Return state to output when the input is valid
    const outputState = () => {
      if (this.requestedAmountInput.current) {
        if (
          this.state.requested_amount ===
          this.validateAmount(
            this.state.requested_amount,
            this.requestedAmountInput.current.props.rules,
            true
          )
        )
          return this.state;
      }
    };

    // escape dot in regex
    const thousandSeparatorRegEx =
      i18n("_thousandsSeparator") === "." ? "\\." : i18n("_thousandsSeparator");

    return (
      <div>
        <Card>
          <Title>{i18n("Discover your options")}</Title>
          <form
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <CalculatorSelect
              name="product"
              label={i18n("Financing purpose")}
              callback={this.saveInputToState}
              options={{
                marketing: i18n("Marketing"),
                equipment: i18n("Equipment")
              }}
              attributes={{
                large: true
              }}
            />

            <CalculatorInput
              name="requested_amount"
              label={i18n("Amount")}
              type="text"
              icon={<EuroSymbol />}
              callback={this.saveAmountToState}
              ref={this.requestedAmountInput}
              rules={{
                min: config.minLoan.amount,
                max: maxLoan.amount
              }}
              attributes={{
                min: config.minLoan.amount,
                max: maxLoan.amount,
                placeholder: i18n("from €{min}K to €{max}K", {
                  min: config.minLoan.amount / 1e3,
                  max: maxLoan.amount / 1e3
                }),
                pattern: `[\\d${thousandSeparatorRegEx}]{1,}`,
                large: true,
                onBlur: event =>
                  this.validateInputAmount(
                    event,
                    this.requestedAmountInput.current.props.rules
                  )
              }}
            />

            <CalculatorSelect
              name="legal_form"
              label={i18n("Legal form")}
              callback={this.saveInputToState}
              options={{
                bv: i18n("BV"),
                sole_proprietorship: i18n("Sole proprietorship")
              }}
              attributes={{
                large: true
              }}
            />

            <CalculatorSelect
              name="duration"
              label={i18n("Term")}
              callback={this.saveInputToState}
              options={this.renderMaxDuration(maxLoan.duration)}
              attributes={{
                large: true,
                value: duration
              }}
            />
          </form>
        </Card>

        <CalculatorError>
          <CalculatorOutput input={outputState()} />
        </CalculatorError>
      </div>
    );
  }
}

export default Calculator;
